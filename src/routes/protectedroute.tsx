import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../redux/store/store"


export const ProtectedRoute=()=>{
    let token=useSelector((store:RootState)=>store.product.token)
    return token?<Outlet/>:<Navigate to='/'/>
}