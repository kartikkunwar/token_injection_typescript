import { Route, Routes } from "react-router-dom"
import { Product } from "../component/product"
import { SingleProduct } from "../component/singleproduct"
import { ProtectedRoute } from "./protectedroute"
import { Signin } from "../component/signin"



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Signin/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Product />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
            </Route>
        </Routes>
    )
}