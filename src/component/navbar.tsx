import { Link } from "react-router-dom"


export const Navbar=()=>{
    return(
        <div className="navbar">
            <Link to='/signup' className="link">Signup</Link>
            <Link to='/' className="link">Login</Link>
            <Link to='/product' className="link">Product</Link>
        </div>
    )
}