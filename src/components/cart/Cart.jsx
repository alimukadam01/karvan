import { React, useState } from 'react'
import './Cart.css'
import productImage from '../assets/batch-001-01.png'

function CartItem({cartItem}) {
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () =>{
        setQuantity((prevQuantity) => prevQuantity + 1); // Increment by 1
    }
    const decreaseQuantity = () =>{
        setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0)); // Increment by 1
    }

    return(
        <tr>
            <td>
                <div className='cart-product-container'>
                    <div className="cart-product-image">
                        <img src={productImage}/>
                    </div>
                    IOYM Hoodie 01
                </div>
            </td>
            <td>L</td>
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
            <td>3000</td>
            <td>{3000 * quantity}</td>
            <td>
                <button type="button" className="tblBtn">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    )
}

function Cart() {

  return (
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
                    <CartItem/>
                    <CartItem/>
                </tbody>
            </table>
        </div>

        <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-items">
                <div className="summary-item">
                    <p>Subtotal</p>
                    <p>12000</p>
                </div>
                <div className="summary-item">
                    <p>Shipping Cost</p>
                    <p>250</p>
                </div>
                <div className="summary-item">
                    <p>GST</p>
                    <p>320</p>
                </div>

                <hr/>
                
                <div className="summary-item">
                    <p>Grand Total</p>
                    <p>PKR 12,570</p>
                </div>
            </div>
            <button type='submit'>
                Proceed to Checkout
            </button>
        </div>
    </div>
  )
}

export default Cart