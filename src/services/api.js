import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/"
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 30000
})

export const login = async (email, password) => {
    const res = await apiClient.post("/auth/jwt/create/", {
      email,
      password,
    })
    
    if (res.status === 200){
        return res.data.access;
    } 

    return null
}

export const fetchBatchList = async ()=>{
    try{
        const res = await apiClient.get('batches/')
        return res.data
    }catch (error){
        console.log(error)
    }
};

const sizeMapping = {
    "Small": "S",
    "Medium": "M",
    "Large": "L",
    "X-Large": "XL"
};

export const fetchProductsList = async (batch_id)=>{
    try{
        const res = await apiClient.get(`batches/${batch_id}/products/`)

        const processedData = res.data.map(product => ({
            ...product,
            sizes: product.sizes.map(sizeObj => ({
                ...sizeObj,
                size: sizeMapping[sizeObj.size]
            }))
        }));

        return processedData;
    }catch (error){
        console.log(error)
    }
}

export const fetchProductDetail = async (batch_id, product_id)=>{
    try{
        const res = await apiClient.get(`batches/${batch_id}/products/${product_id}/`)
        return res.data
    }catch (error){
        console.log(error)
    }
}

export const createCart = async ()=>{
    try{
        const res = await apiClient.post("cart/")
        if (res.status === 201){
            localStorage.setItem("cart_id", res.data.id)
            return res.data.id
        }else{
            return null
        }
    }catch (error){
        console.log(error)
    }
}

export const addToCart = async (batch_id, product_id, cart_id, quantity, size)=>{
    try{
        const res = await apiClient.post(
            `batches/${batch_id}/products/${product_id}/add_to_cart/`, {
            "id": cart_id,
            "quantity": quantity,
            "size": size
        })
        return res.data
    }catch (error){
        console.log(error)
    }
}

export const fetchCartItems = async (cart_id)=>{
    try{
        const res = await apiClient.get(`cart/${cart_id}/items/`)
        return res.data
    }catch (error){
        console.log(error)
    }
}

export const deleteCartItem = async (cart_id, item_id)=>{
    try{
        const res = await apiClient.delete(`cart/${cart_id}/items/${item_id}/`)
        if (res.status === 204){
            return true
        }
        return false

    }catch(error){
        console.log(error)
        return false
    }
}


export const initiateOrder = async (cart_id) =>{
    try{
        const res = await apiClient.post(
            `cart/${cart_id}/initiate_order/`, {}
        )

        if (res.status === 200){
            return res.data.id
        }else{
            return null
        }
        
    }catch(error){
        console.log(error)
        return null
    }
}

export const fetchOrderDetails = async (order_id) =>{
    try{
        const res = await apiClient.get(`orders/${order_id}/`)
        if (res.status === 200){
            console.log("data captured by API function")
            return res.data
        }
    }catch(error){
        console.log(error)
        return null
    }
}

export const finalizeOrder = async (order_id) =>{
    try{
        const res = await apiClient.post(
            `orders/${order_id}/finalize_order/`, {}
        )

        if (res.status === 200){
            return res.data
        }else{
            return null
        }
        
    }catch(error){
        console.log(error)
        return null
    }
}

export const fetchBuyerDetails = async (email) =>{
    try{
        const access = await login("amurtaza907@gmail.com", "polaroids34")

        if (access){
            
            const res = apiClient.post(
                "buyers/search/",{
                "email": email
            }, {
                headers: {
                    "Authorization": `JWT ${access}`
                }
            })
    
            if (res.status === 200){
                return res.data``
            }
    
            return null
        }

        return null

    }catch(error){
        console.log(error)
    }
}