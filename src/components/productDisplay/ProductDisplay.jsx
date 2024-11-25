import './ProductDisplay.css';
import React from 'react';

function ProductDisplay(props) {
  return (
    <div className='product-display-container'>
        {props.products.map((product, index) => (
            <div className='product-container'>
                <img src={product.image} alt='/'/>
                <div className='product-details'>
                    <h3>{product.name}</h3>
                    <p>{product.sizes}</p>
                    <div className='product-details-pricing'>
                        <h3>PKR {product.price}</h3>
                        <p>add to cart</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ProductDisplay