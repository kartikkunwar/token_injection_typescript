import { Route, Routes } from "react-router-dom"
import { Product } from "../component/product"
import { SingleProduct } from "../component/singleproduct"
import { ProtectedRoute } from "./protectedroute"
import { Login } from "../component/login"
import { Signup } from "../component/signup"
import { ConfirmEmail } from "../component/confirmemail"
import { ChangePass } from "../component/changepass"
import { FormValidationTry } from "../component/formvalidation"
import { TableItem } from "../component/tablecomponent/table"



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/changepass/:id" element={<ChangePass/>}/>
            <Route path="/confirmemail" element={<ConfirmEmail/>}/>
            <Route path="/try" element={<FormValidationTry/>}/>
            <Route path="/table" element={<TableItem/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Product />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
            </Route>
        </Routes>
    )
}