import { React, useState, useEffect } from 'react'
import './Review.css'
import { useParams, useNavigate, createRoutesFromChildren } from 'react-router-dom'
import { fetchOrderDetails, reviewOrder } from '../../services/api.js'
import { showErrorToast, showSuccessToast } from '../../services/utils.js'
import { SyncLoader } from 'react-spinners'

function Review({ orderItem, onReviewChange }) {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [hovered, setHovered] = useState(0)


    const handleRatingChange = (rating) =>{
        setRating(rating)
        onReviewChange(orderItem.product.id, 'rating', rating)
    }

    const handleReviewChange = (review) =>{
        setReview(review)
        onReviewChange(orderItem.product.id, 'review', review)
    }

    return (
        <div className="product-review-container">
            <div className="review-product-image-container">
                <img src={ orderItem.product.images[0].image } alt="product-image"/>
            </div>
            <h4 style={{"textAlign": "center"}}>{orderItem.product.name}</h4>
            <div className="review-component">
                <div className="review-stars">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                        <i
                            key={star}
                            className={`fa-star cursor-pointer transition-all ${
                            (hovered >= star || rating >= star) ? "fas text-yellow-400" : "far text-gray-300"
                            }`}
                            style={{ color: hovered >= star || rating >= star ? "yellow" : "white" }}
                            onMouseEnter={ () => setHovered(star) }
                            onMouseLeave={ () => setHovered(0) }
                            onClick={ ()=>handleRatingChange(star) }
                            value={ star }
                        />
                    ))}

                </div>
                <div className="review-text-component">
                    <h6>Drop in a review!</h6>
                    <textarea 
                        name="notes"
                        rows={2} cols={20} 
                        placeholder='Sooo...what do you think?' 
                        onChange={ (e) => handleReviewChange(e.target.value) }
                    />
                </div>
            </div>
        </div>
    )
}

function ReviewDisplay() {
    const { order_id } = useParams()
    const [isReviewed, setIsReviewed] = useState(false)
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([]) 
    const [orderItems, setOrderItems] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        const getOrderDetails = async ()=>{
            try{
                const fetchedOrder = await fetchOrderDetails(order_id)
                if (fetchedOrder){
                    const uniqueItems = fetchedOrder.items
                        .filter((item, index, self) =>
                        self.findIndex(t => t.product.id === item.product.id) === index
                    )
                    setIsReviewed(fetchedOrder.is_reviewed)
                    setOrderItems(uniqueItems)
                    setReviews(uniqueItems.map(item => ({
                        product_id: item.product.id,
                        rating: 0,
                        review: ''
                    })))
                }else{
                    showErrorToast("Oops! we couldn't find that order. Might wanna check that link?")
                }

            }catch(error){
                console.log(error)
                showErrorToast("Oops! we ran into an error. Try reloading.")
            }
        }

        getOrderDetails()
    }, [order_id])
    
    const handleReviewChange = (productId, field, value)=>{
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.product_id === productId
                    ? { ...review, [field]: value }
                    : review
            )
        )
    }

    const handleSubmit = async ()=>{
        try{
            setIsLoading(true)
            const is_submitted = await reviewOrder(order_id, reviews)
            if (is_submitted){
                setIsLoading(false)
                showSuccessToast("Thankyou for your review!")
                navigate("/")

            }else{
                setIsLoading(false)
                showErrorToast("There was an error submitting your review. Please try again.")
            }
        }catch(error){
            console.log(error)
            setIsLoading(false)
            showErrorToast("There was an error submitting your review. Please try again.")
        }
    }

    if (!isReviewed) return (
        <div className="review-content-container">
            <div className="review-form-container">
                <h3 style={{
                    "textAlign": "center",
                }}>Like what you have? Leave some comments!</h3>
                
                {orderItems && orderItems.map((item, idx)=>(
                    <Review orderItem={ item } onReviewChange={ handleReviewChange }/>
                ))}

                <button type='submit' onClick={ handleSubmit }>
                  { isLoading? <SyncLoader size={4} speedMultiplier={0.75} margin={2} color="white" /> : "Submit" }
                </button>
            </div>
        </div>
    )

    return (
        <div style={{
            "display": "flex",
            "justifyContent": "center",
            "padding": "100px"
        }}>
            <div className="thankyou-content-container">
                <h5 style={{
                    "color": "white",
                    "textAlign": "center",
                    "lineHeight": 1.5
                }}>
                    Thankyou for reviewing our Products! We're constantly working on making them better for you :)
                </h5>

                <button type='submit' onClick={ ()=>navigate("/") }>
                   Take me shopping!
                </button>
            </div>
        </div>
    )
}

export default ReviewDisplay