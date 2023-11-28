import { Route, Routes } from "react-router-dom"
import { Login } from "../component/login"
import { Product } from "../component/product"
import { SingleProduct } from "../component/singleproduct"
import { ProtectedRoute } from "./protectedroute"



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Product />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
            </Route>
        </Routes>
    )
}