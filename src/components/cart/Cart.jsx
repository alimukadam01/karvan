import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import productImage from '../assets/batch-001-01.png'
import { fetchCartItems, deleteCartItem, initiateOrder, updateCartItemQuantity } from '../../services/api';
import { showErrorToast } from '../../services/utils';

function CartItem({cartItem, cart_id, onDelete, onQuantityChange}) {

    const sizeMapping = {
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
        const newQuantity = quantity > 0 ? quantity - 1 : 0
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

    return(
        <tr>
            <td>
                <div className='cart-product-container'>
                    <div className="cart-product-image">
                        <img src={productImage}/>
                    </div>
                    {cartItem.product.name}
                </div>
            </td>
            <td>{sizeMapping[cartItem.size]}</td>
            <td>
            <div className="cart-quantity-component">
                <button 
                    className='cart-quantity-btn'
                    onClick={ decreaseQuantity }
                >-</button>
                    <p id='cart-item-quantity'>{ quantity }</p>
                <button 
                    className='cart-quantity-btn'
                    onClick={ increaseQuantity }  
                >+</button>
            </div>
            </td>
            <td>{cartItem.product.price}</td>
            <td>{cartItem.product.price * quantity}</td>
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
    )
}

function Cart() {

    const [cart_id, setCartId] = useState(localStorage.getItem("cart_id"))
    const [cartItems, setCartItems] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const navigate = useNavigate()

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

    const getSubTotal = ()=>{
        setSubTotal(calcSubTotal(cartItems))
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
            const order_id = await initiateOrder(cart_id)
            if (order_id){
                localStorage.removeItem("cart_id")
                navigate('/checkout/', {
                    state: {
                        order_id: order_id
                    }
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        setSubTotal(calcSubTotal(cartItems));
    }, [cartItems])
    
    if (cartItems.length != 0){ return(
        <div className='cart-and-summary-container'>
            <div className="cart-container">
                <h1>Items in your bag</h1>
                <table className="table all-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
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
            </div>

            <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="summary-items">
                    <div className="summary-item">
                        <p>Subtotal</p>
                        <p>{subTotal}</p>
                    </div>

                    <hr/>
                    
                    <div className="summary-item">
                        <p>Grand Total</p>
                        <p>PKR {subTotal}</p>
                    </div>
                </div>
                <button 
                    type='submit'
                    onClick={ checkout }
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )} else{
        return(
            <div className='empty-cart-container'>
                <h1>Your cart is empty</h1>
            </div>
        ) 
    }}

export default Cart