import './ProductDisplay.css';
import React from 'react';
import { useState } from 'react';

function Product({product}) {
    const [size, setSize] = useState(product.sizes[0]);

    const selectSize = (size) =>{
        console.log(size)
        setSize(size);
    }

    return (
        <div className='product-container'>
                <img src={product.image} alt='/'/>
                <div className='product-details'>
                    <h3>{product.name}</h3>
                    <div className='product-sizes'>
                        {product.sizes.map((option, index)=>(
                            <a key={index}
                                className={`product-size ${option === size ? "selected" : ""}`}
                                onClick={()=>selectSize(option)}
                            >{option}</a>
                        ))}
                    </div>
                    <div className='product-details-pricing'>
                        <h3>PKR {product.price}</h3>
                        <a href='#'>add to cart</a>
                    </div>
                </div>
            </div>
    )
}

function ProductDisplay(props) {
    const [size, setSize] = useState("S");

    const selectSize = (size) =>{
        setSize(size);
    }

  return (
    <div className='container-fluid' id='product-display-container'>
        {props.products.map((product, index) => (
            <Product key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default ProductDisplay