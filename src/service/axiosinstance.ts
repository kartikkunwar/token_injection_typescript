import axios from "axios";

let store:any
export const injectstore=(_store:any)=>{
    store=_store
}

export const axiosInstance=axios.create({
    baseURL:`https://fakestoreapi.com/`
});

axiosInstance.interceptors.request.use((request)=>{
    const data=store.getState()
    const token=data.product.token
    request.headers.token=token
    return request
})

