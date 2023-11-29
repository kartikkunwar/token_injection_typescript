import { Route, Routes } from "react-router-dom"
import { Product } from "../component/product"
import { SingleProduct } from "../component/singleproduct"
import { ProtectedRoute } from "./protectedroute"
import { Login } from "../component/login"
import { Signup } from "../component/signup"



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Product />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
            </Route>
        </Routes>
    )
}