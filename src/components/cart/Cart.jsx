import React from 'react'
import './Cart.css'

function Cart() {
  return (
    <div className='cart-and-summary-container'>
        <div className="cart-container">
            <h1>Items in your bag</h1>
            <div className="cart">
                <div className="table table-customized">
                    <thead className='table-row'>
                        <tr className='table-row'>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>

                    <tr className='table-row'>
                        <td></td>
                        <td>Mark</td>
                        <td>Medium</td>
                        <td>3000</td>
                        <td>2</td>
                        <td>6000</td>
                    </tr>
                </div>
            </div>
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