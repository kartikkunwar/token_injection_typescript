import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
import { getProduct } from "../redux/store/reducer/productslice";




export const Product = () => {
    const dispatch = useDispatch<any>();
    const productList = useSelector((store:RootState) => store.product.product)

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (
        <div>
            <h1>Product Page</h1>
            <div className="main">
                {
                    productList && productList.map((el:any) => {
                        return (
                            <div key={el.id}>
                                <Link to={`/product/${el.id}`}>
                                    <img src={el.image} alt={el.id} style={{ width: "100%", height: "70%" }} />
                                    <h3 style={{ width: "100%", height: "20%" }}>{el.title}</h3></Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}