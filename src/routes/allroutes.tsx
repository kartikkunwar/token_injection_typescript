import { Route, Routes } from "react-router-dom"
import { Product } from "../component/product"
import { SingleProduct } from "../component/singleproduct"
import { ProtectedRoute } from "./protectedroute"
import { Login } from "../component/login"
import { ConfirmEmail } from "../component/confirmemail"
import { ChangePass } from "../component/changepass"
import { FormValidationTry } from "../component/formvalidation"
import { UserTable } from "../pages/userTable"
import { Signup } from "../component/signup"
import { CheckTable } from "../component/reacttablecomponent/page"



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/changepass/:id" element={<ChangePass/>}/>
            <Route path="/confirmemail" element={<ConfirmEmail/>}/>
            <Route path="/try" element={<FormValidationTry/>}/>
            <Route path="/table" element={<UserTable/>}/>
            <Route path="/reacttable" element={<CheckTable/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/product" element={<Product />}/>
                <Route path="/product/:id" element={<SingleProduct />}/>
            </Route>
        </Routes>
    )
}