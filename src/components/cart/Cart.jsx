import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import EmptyCart from '../emptyCart/EmptyCart' 
import './Cart.css'
import { fetchCartItems, deleteCartItem, initiateOrder, updateCartItemQuantity } from '../../services/api';
import { showErrorToast } from '../../services/utils';
import { useMobileContext } from '../mobile-context/MobileContext';

function CartItem({cartItem, cart_id, onDelete, onQuantityChange}) {

    const isMobile = useMobileContext()

    const sizeMapping = {
        "X-Small": "XS",
        "Small": "S",
        "Medium": "M",
        "Large": "L",
        "X-Large": "XL"
    }
    
    const [quantity, setQuantity] = useState(cartItem.quantity)
    const increaseQuantity = async () =>{
        const newQuantity = quantity + 1
        try{
            const is_updated = await updateCartItemQuantity(cart_id, cartItem.id, newQuantity)
            if (is_updated){
                setQuantity(newQuantity) // Increment by 1
                onQuantityChange(cartItem.id, newQuantity)
            }
        }catch(error){
            showErrorToast("Oops! we ran into an error. Please try again.")
            console.log(error)
        }
    }

    const decreaseQuantity = async () =>{
        const newQuantity = quantity > 1 ? quantity - 1 : 1
        try{
            const is_updated = await updateCartItemQuantity(cart_id, cartItem.id, newQuantity)
            if (is_updated){
                setQuantity(newQuantity) // Increment by 1
                onQuantityChange(cartItem.id, newQuantity)
            }
        }catch(error){
            showErrorToast("Oops! we ran into an error. Please try again.")
            console.log(error)
        }
    }

    const deleteItem = async ()=>{
        try{
            const is_deleted = await deleteCartItem(cart_id, cartItem.id)
            if (is_deleted){
                onDelete(cartItem.id)
            }
        }catch(error){
            console.log(error)
        }
    }

    if (isMobile){ return(
        <div className="cart-product-mobile-container">
            <div className="checkout-product-image-details">
                <div className="checkout-product-image">
                    <img src={cartItem.product?.images[0]?.image} alt="product-image" />
                </div>
                <div className="checkout-product-details" style={{
                    "align-items": "flex-start",
                    "justifyContent": "space-between"
                }}>
                    <div>
                        <p>{cartItem.product.name} x {cartItem.quantity}</p>
                        <p>Size: {sizeMapping[cartItem.size]}</p>
                    </div>
                    <div className="cart-quantity-component">
                        <button 
                            id='left-btn'
                            className='cart-quantity-btn'
                            onClick={ decreaseQuantity }
                        >-</button>
                            <p id='cart-item-quantity'>{ quantity }</p>
                        <button 
                            id='right-btn'
                            className='cart-quantity-btn'
                            onClick={ increaseQuantity }  
                        >+</button>
                    </div>
                </div>
            </div>
            <div className="checkout-product-details" style={{
                "align-items": "flex-start",
                "justifyContent": "space-between"
            }}>
                <p>PKR {cartItem.product.price * quantity}</p>
                <button 
                    type="button" 
                    className="tblBtn"
                    onClick={ deleteItem }
                >
                    <i className="fa fa-trash" aria-hidden="true" style={{
                        "lineHeight": "none"
                    }}></i>
                    <p>remove</p>
                </button>
            </div>
        </div>
    
    )} else { return(
        <tr>
            <td>
                <div className='cart-product-container'>
                    <div className="cart-product-image">
                        <img src={cartItem.product?.images[0]?.image} alt='product-image'/>
                    </div>
                    <p>{cartItem.product.name}</p>
                </div>
            </td>
            <td><p>{sizeMapping[cartItem.size]}</p></td>
            <td>
            <div className="cart-quantity-component">
                <button 
                    id='left-btn'
                    className='cart-quantity-btn'
                    onClick={ decreaseQuantity }
                >-</button>
                    <p id='cart-item-quantity'>{ quantity }</p>
                <button 
                    id='right-btn'
                    className='cart-quantity-btn'
                    onClick={ increaseQuantity }  
                >+</button>
            </div>
            </td>
            <td><p>{cartItem.product.price}</p></td>
            <td><p>{cartItem.product.price * quantity}</p></td>
            <td>
                <button 
                    type="button" 
                    className="tblBtn"
                    onClick={ deleteItem }
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    )}
}

function Cart() {

    const cart_id = localStorage.getItem("cart_id")
    const [isLoading, setIsLoading] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const isMobile = useMobileContext()
    const navigate = useNavigate()

    // Fetch Cart Items. 
    useEffect(()=>{
        const getCartItems = async (cart_id)=>{
            try{
                const items = await fetchCartItems(cart_id)
                setCartItems(items)
            }catch(error){
                console.log(error)
            }
        }

        getCartItems(cart_id)
    }, [cart_id])

    const handleDelete = (item_id)=>{
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== item_id)
        )
    }

    const calcSubTotal = (cartItems)=>{
        let subTotal = 0
        for(let item of cartItems){
            subTotal += item.product.price * item.quantity
        }
        return subTotal
    }

    const handleQuantityChange = (itemId, newQuantity) => {
        setCartItems((prevCartItems) => 
            prevCartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const checkout = async ()=>{
        try{
            setIsLoading(true)
            const order_id = await initiateOrder(cart_id)
            if (order_id){
                localStorage.removeItem("cart_id")
                setIsLoading(false)
                navigate('/checkout/', {
                    state: {
                        order_id: order_id
                    }
                })
            }else{
                setIsLoading(false)
                showErrorToast("Oops! We ran into an error. Please try again.")
            }
        }catch(error){
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        setSubTotal(calcSubTotal(cartItems));
    }, [cartItems])
    
    if (cartItems.length !== 0){ return(
        <div className={`cart-and-summary-${isMobile?'mobile-container': 'container'}`}>
            <div className="cart-container">
                <h3>Items in your bag</h3>

                {isMobile? (
                    <div className="cart-items-container">
                        {
                        cartItems.map((cart_item, index)=>(
                            <CartItem 
                                key={cart_item.id} 
                                cartItem={cart_item} 
                                cart_id={cart_id} 
                                onQuantityChange={handleQuantityChange} 
                                onDelete={handleDelete}
                            />
                        
                        ))}
                    </div>
                ): (
                    <table className="table all-table">
                        <thead>
                            <tr>
                                <th><h5>Product</h5></th>
                                <th><h5>Size</h5></th>
                                <th><h5>Quantity</h5></th>
                                <th><h5>Price</h5></th>
                                <th><h5>Total</h5></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map((cart_item, index)=>(
                                <CartItem 
                                    key={cart_item.id} 
                                    cartItem={cart_item} 
                                    cart_id={cart_id} 
                                    onQuantityChange={handleQuantityChange} 
                                    onDelete={handleDelete}
                                />
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            {isMobile? (
                <button 
                className='ptc-btn-mobile' 
                type='submit'
                onClick={ checkout }
                >   
                    { isLoading? <SyncLoader size={4} speedMultiplier={0.75} margin={2} color="#8C24C7" /> : "Proceed to Checkout" }
                </button>
            ): (
                <div className="order-summary">
                    <h5>Order Summary</h5>
                    <div className="summary-items">
                        <div className="summary-item">
                            <p>Subtotal</p>
                            <p>PKR {subTotal}</p>
                        </div>
                        <div className="summary-item">
                            <p>Shipping</p>
                            <p>at checkout</p>
                        </div>

                        <hr/>
                        
                        <div className="summary-item">
                            <p>Grand Total</p>
                            <p>at checkout</p>
                        </div>
                    </div>
                    <button
                        className='ptc-btn'
                        type='button'
                        onClick={ checkout }
                    >
                        { isLoading? <SyncLoader size={4} speedMultiplier={0.75} margin={2} color="white" /> : "Proceed to Checkout" }
                    </button>
                </div>
            )}
        </div>
    )} else{
        return(
            <EmptyCart/>
        ) 
    }}

export default Cart