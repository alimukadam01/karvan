import './ProductDisplay.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductsList } from '../../services/api';

function Product({product}) {
    const [size, setSize] = useState(product.sizes[0].size);
    const selectSize = (size) =>{
        setSize(size);
    }

    const navigate = useNavigate()
    const goToProductDetail = () => {
        navigate('products/', {
            state: {
                product_id: product.id,
                batch_id: product.batch
            }
        })
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
                    <a href='#'>add to cart</a>
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