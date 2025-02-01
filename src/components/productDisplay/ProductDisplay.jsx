import './ProductDisplay.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductsList } from '../../services/api';
import { addToCart } from '../../services/api';
import { showErrorToast, showSuccessToast } from '../../services/utils';

function Product({product}) {
    const sizeMapping = {
        "XS": "X-Small",
        "S": "Small",
        "M": "Medium",
        "L": "Large",
        "XL": "X-Large"
    }

    const [size, setSize] = useState(product?.sizes[0].size);
    const selectSize = (size) =>{
        setSize(size);
    }
    const cart_id = localStorage.getItem("cart_id")
    const navigate = useNavigate()
    const goToProductDetail = () => {
        navigate('products/', {
            state: {
                product_id: product.id,
                batch_id: product.batch
            }
        })
    }

    const handleAtcClick = async ()=>{
        try{
            const is_added = await addToCart(product.batch, product.id, cart_id, 1, sizeMapping[size])
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

    return (
        <div className='product-container'>
            <img src={product.images[0].image} alt='/' onClick={ goToProductDetail }/>
            <div className='product-details'>
                <h3>{product.name}</h3>

                <div className='product-sizes'>
                    {product.sizes.map((option, index)=>(
                        <a key={index}
                            className={`product-size ${option.size === size ? "selected" : ""}`}
                            onClick={()=>selectSize(option.size)}
                        >{option.size}</a>
                    ))}
                </div>

                <div className='product-details-pricing'>
                    <h3>PKR {product.price}</h3>
                    <a onClick={ handleAtcClick }>add to cart</a>
                </div>
            </div>
        </div>
    )
}

function ProductDisplay(props) {

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const getProducts = async (batch_id)=>{
            try{
                const data = await fetchProductsList(batch_id)
                setProducts(data);
            }catch(error){
                console.log(error)
            }
        };

        getProducts(props.batch_id);
    }, [])

  return (
    <div className='container-fluid' id='product-display-container'>
        {products.map((product, index) => (
            <Product key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default ProductDisplay;