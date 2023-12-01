import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoute = () => {
    let usert: any = localStorage.getItem("usertoken");
    let token = JSON.parse(usert)

    var result = true;
    if (token) {
        const check = Date.now() / 1000
        const valid: any = jwtDecode(token).exp
        result = valid < check
    }
    if (result) {
        localStorage.removeItem("usertoken")
    }
    return token && !result ? <Outlet /> : <Navigate to='/' />
}