import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "../redux/store/store"
import { getSingleProduct } from "../redux/store/reducer/productslice"


export const SingleProduct = () => {
    const params = useParams()
    const dispatch = useDispatch<any>();
    const product = useSelector((store: RootState) => store.product.singleproduct)
    useEffect(() => {
        let id = params.id
        dispatch(getSingleProduct(id))
    }, [params, dispatch])
    return (
        <>
            <h1>Single Product</h1>
            {
                product && product.map((el, ind) => {
                    return (
                        <div className="single" key={ind}>
                            <img src={el.image} alt="img" />
                            <h1>{el.price}</h1>
                        </div>
                    )
                })
            }
        </>
    )
}