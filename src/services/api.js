import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/"
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 30000
})

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