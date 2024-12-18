import './ProductDisplay.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product({product}) {
    const [size, setSize] = useState(product.sizes[0]);

    const selectSize = (size) =>{
        console.log(size)
        setSize(size);
    }

    const navigate = useNavigate()
    const goToProductDetail = () => {
        navigate('products/', {
            state: {
                product
            }
        })
    }

    return (
        <div className='product-container'>
                <img src={product.images[0]} alt='/' onClick={ goToProductDetail }/>
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
  return (
    <div className='container-fluid' id='product-display-container'>
        {props.products.map((product, index) => (
            <Product key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default ProductDisplay;