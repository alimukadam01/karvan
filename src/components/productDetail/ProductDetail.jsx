import React from 'react'
import './ProductDetail.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function ProductDetail() {

  const location = useLocation()
  const product = location.state.product || {}
  
  const options = product.sizes
  const [size, setSize] = useState(options[0]);
  const selectSize = (size) =>{
    setSize(size);
  }

  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () =>{
    setQuantity((prevQuantity) => prevQuantity + 1); // Increment by 1
  }
  const decreaseQuantity = () =>{
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0)); // Increment by 1
  }

  const [image, setImage] = useState(product.images[0]);
  const selectImage = (image) =>{
    setImage(image);
  }

  const renderStars = (rating) => {
    const stars = []

    for (let i=0; i<5; i++){
      if (rating >= 1){
        stars.push(<i className="fas fa-star fa-xl"></i>)
        rating = rating - 1
      } else if(rating >= 0.5){
        stars.push(<i className="fas fa-star-half-alt fa-xl"></i>)
        rating = rating - 0.5
      }else{
        stars.push(<i className="fa-regular fa-star fa-xl"></i>)
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
              <div className={`carousel-image ${selectedImage === image ? "selected" : ""}`}>
                <img
                  onClick={()=>selectImage(selectedImage)} 
                  src={selectedImage} alt='/'
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
                <h1>{ product.name.toUpperCase() }</h1>
              </div>
          
              <div className='product-rating'>
                {renderStars(product.rating)}
                <a href='#'>150 Reviews</a>
              </div>
            </div>
          
            <hr/>
          
            <div className='product-description'>
              The "Isolation of Your Mind" hoodie encapsulates the essence of introspection and individuality. 
              The design features a striking visual representation of a serene, solitary figure surrounded by abstract 
              patterns symbolizing the complexity of thoughts. Muted tones and a minimalist aesthetic evoke a sense of 
              calm and self-reflection, while bold typography reinforces the theme of mental solitude.
              <br/><br/>
              Crafted with premium-quality fabric, this hoodie offers both comfort and style, making it perfect for 
              those who embrace their unique inner worlds. Whether you're seeking a cozy companion for quiet moments or 
              a statement piece for thoughtful expression, this hoodie is a wearable work of art.
            </div>
            
            <h1 id='price-tag'>PKR {product.price}</h1>
            <p>
              {`${product.availability ? "In Stock": "Out of Stock"}`}
            </p>
            
            <div className="size-quantity-purchase-container">
              <div>
                <div className='size-title'>
                  <h4>Select Size</h4>
                  <a href='#'>size chart</a>
                </div>

                <div className="sizes-container">
                  {options.map((option, index)=>(
                    <button 
                      key={index}
                      className={`size-button ${option === size ? "selected" : ""}`}
                      onClick={()=>{selectSize(option)}}
                    ><p className='btn-text'>{option}</p></button>
                  ))}
                </div>
              </div>
              
              <div className='quantity-container'>
                <h4>Quantity</h4>
                <div className="quantity-component">
                  <button 
                    className='quantity-button'
                    onClick={decreaseQuantity}
                  >-</button>
                    <p id='quantity'>{quantity}</p>
                  <button 
                    className='quantity-button'
                    onClick={increaseQuantity}  
                  >+</button>
                </div>
              </div>

              <div className="purchase-container">
                <div className='adc-and-like-btns'>
                  <button className="purchase-btn">
                    <p className='btn-text'>Add to Cart</p>
                  </button>
                  <button className="like-btn">
                    <i className='fa-regular fa-heart'/>
                  </button>
                </div>

                <div className='bin-container'>
                  <button className='purchase-btn'>
                    <p className="btn-text">Buy it now</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail