import { React, useState, useEffect } from 'react'
import './ProductDetail.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { buyProduct, fetchProductDetail } from '../../services/api'
import { handleScrollNavigate } from '../../services/utils'
import { addToCart } from '../../services/api'
import { showSuccessToast } from '../../services/utils'
import { showErrorToast } from '../../services/utils'

function ProductDetail() {

  const location = useLocation({
    "state": {

    }
  })
  const navigate = useNavigate()
  const product_id = location.state.product_id || null
  const batch_id = location.state.batch_id || null
  const cart_id = localStorage.getItem("cart_id")

  const [product, setProduct] = useState({
    "sizes" : [],
    "images": [],
    "reviews": []
  })

  const options = product.sizes
  const [size, setSize] = useState(null);
  const selectSize = (size) =>{
    setSize(size);
  }

  const [image, setImage] = useState(null);
  const selectImage = (image) =>{
    setImage(image);
  }

  // fetches product
  useEffect(()=>{
    const getProductDetail = async (batch_id, product_id)=>{
      try{
        const data = await fetchProductDetail(batch_id, product_id)
        setProduct(data);
      }catch(error){
        console.log("Error fetching product", error)
      }
    }
    
    window.scrollTo(0, 0)
    getProductDetail(batch_id, product_id)
  }, [batch_id, product_id])

  // updates sizes and image states
  useEffect(()=>{
    const updateSizeImage = ()=>{
      if (product.sizes.length > 0 && size === null){
        setSize(product.sizes[0].size)
      }
      
      if (product.images.length > 0 && image === null){
        setImage(product.images[0].image)
      }
    }

    updateSizeImage();
  }, [product])
  
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () =>{
    setQuantity((prevQuantity) => prevQuantity + 1); // Increment by 1
  }
  const decreaseQuantity = () =>{
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Increment by 1
  }

  const handleAtcClick = async ()=>{
    try{
      const is_added = await addToCart(batch_id, product_id, cart_id, quantity, size)
      if (is_added){
        navigate('/')
        showSuccessToast("Item added to Cart")
      }else{
        showErrorToast("Oops! we ran into an error. Please try again.")
      }
    }catch(error){
      showErrorToast("Oops! we ran into an error. Please try again.")
      console.log(error)
    }
  }

  const buy = async ()=>{
    try{
      const order_id = await buyProduct(batch_id, product_id, quantity, size)
      if (order_id){
        navigate('/checkout', {
          state: {
            "order_id": order_id
          }
        })
      }else{
        showErrorToast("Oops! we ran into an error. Please try again.")
      }

    }catch(error){
      console.log(error)
      showErrorToast("Oops! we ran into an error. Please try again.")
    }
  }

  const [review_idx, setReviewIdx] = useState(0)
  const [fade, setFade] = useState(false)
  const [direction, setDirection] = useState()
  const nextReview = ()=>{
    if (review_idx > product?.reviews.length - 2) return
    setDirection("right")
    setFade(true) // Start fade-out
    setTimeout(() => {
      setReviewIdx((prevIdx) =>
        prevIdx < product?.reviews.length - 1 ? prevIdx + 1 : prevIdx
      );
      setFade(false) // Fade in new review
    }, 300)
  }
  const prevReview = ()=>{
    if (review_idx < 1) return

    setDirection("left")
    setFade(true)
    setTimeout(() => {
      setReviewIdx((prevIdx) =>
        prevIdx > 0 ? prevIdx - 1: prevIdx
      )
      setFade(false)
    }, 300)
  }

  const scrollToReviews = () => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  }

  const renderStars = (rating, component) => {
    const stars = []

    for (let i=0; i<5; i++){
      if (rating >= 1){
        if(component === "product-title"){
          stars.push(<i className="fas fa-star fa-xl"></i>)
        }else{
          stars.push(<i className="fas fa-star fa-s" style={{"color": "#FFFF00"}}></i>)
        }
        rating = rating - 1
      } else if(rating >= 0.5){
        if(component === "product-title"){
          stars.push(<i className="fas fa-star-half-alt fa-xl"></i>)
        }else{
          stars.push(<i className="fas fa-star-half-alt fa-s" style={{"color": "#FFFF00"}}></i>)
        }
        rating = rating - 0.5
      }else{
        if(component === "product-title"){
          stars.push(<i className="fa-regular fa-star fa-xl"></i>)
        }else{
          stars.push(<i className="fa-regular fa-star fa-s" style={{"color": "#FFFF00"}}></i>)
        }
      }
    }

    return stars;
  }
  
  return (
    <div>
      <div className='container-fluid product-detail-container'>
        <div className="left-section">
          <div className='product-images-carousel'>
            {product.images.map((selectedImage, index)=>(
              <div className={`carousel-image ${selectedImage.image === image ? "selected" : ""}`}>
                <img key={selectedImage.id}
                  onClick={()=>selectImage(selectedImage.image)} 
                  src={selectedImage.image} alt='/'
                />
              </div>
            ))}
          </div>
          
          <div className='product-image-container'>
            <img src={image} alt='/'/>
          </div>
        </div>
        
        <div className='right-section'>
          <div className='product-detail'>
            <div className='title-container'>
              <div className='product-title'>
                <p>From BATCH-00{ product.batch }</p>
                <h1>{ product.name? product.name.toUpperCase(): "" }</h1>
              </div>
          
              <div className='product-rating'>
                {renderStars(product.rating, "product-title")}
                <button onClick={ scrollToReviews }>
                  { product.reviews.length } Reviews
                </button>
              </div>
            </div>
          
            <hr/>
          
            <div className='product-description'>
              { product.desc }
            </div>
            
            <h1 id='price-tag'>PKR { product.price }</h1>
            <p>
              {`${ product.is_available ? "In Stock": "Out of Stock" }`}
            </p>
            
            <div className="size-quantity-purchase-container">
              <div>
                <div className='size-title'>
                  <h4>Select Size</h4>
                  <a href='#'>size chart</a>
                </div>

                <div className="sizes-container">
                  { options.map((option, index)=>(
                    <button 
                      key={ index }
                      className={`size-button ${option.size === size ? "selected" : ""}`}
                      onClick={()=>{selectSize(option.size)}}
                    ><p className='btn-text'>{option.size}</p></button>
                  )) }
                </div>
              </div>
              
              <div className='quantity-container'>
                <h4>Quantity</h4>
                <div className="quantity-component">
                  <button 
                    className='quantity-button'
                    onClick={ decreaseQuantity }
                  >-</button>
                    <p id='quantity'>{ quantity }</p>
                  <button 
                    className='quantity-button'
                    onClick={ increaseQuantity }  
                  >+</button>
                </div>
              </div>

              <div className="purchase-container">
                <div className='adc-and-like-btns'>
                  <button 
                    className="purchase-btn" 
                    onClick={ handleAtcClick }
                  >
                    <p className='btn-text'>Add to Cart</p>
                  </button>
                  <button 
                    className='purchase-btn'
                    onClick={ buy }
                  >
                    <p className="btn-text">Buy it now</p>
                  </button>
                </div>
              </div>
            </div>
          
            { product?.reviews?.length > 0 && (
              <div id="reviews" className='product-reviews-parent'>
                <h3>Reviews</h3>
                <hr/>
                <div className='product-reviews-container'>
                  <i className='fa-solid fa-caret-left fa-xl' onClick={prevReview}/>

                  <div key={review_idx} className={`product-review ${fade ? `fade-out-${direction}` : "fade-in"}`}>
                    <div className="review-title">
                      <h5>by {product?.reviews[review_idx]?.buyer?.first_name} {product?.reviews[review_idx]?.buyer?.last_name}</h5>
                      <div className="product-rating">{renderStars(product?.reviews[review_idx]?.rating)}</div>
                    </div>
                    <div className="review-text">
                      <p>{product?.reviews[review_idx]?.review}</p>
                    </div>
                  </div>
                  
                  <i className='fa-solid fa-caret-right fa-xl' onClick={nextReview}/>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}

export default ProductDetail