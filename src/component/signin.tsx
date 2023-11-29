import { FormProvider, useForm } from "react-hook-form"
import { Input } from "./input"
import { emailValidation, passwordValidation } from "../utils/inputvalidation"
import { Dropdown } from "./dropdown"
import { ChangeEvent, useEffect } from "react"
import i18next from "i18next"
import { useDispatch, useSelector } from "react-redux"
import { getLoginToken } from "../redux/store/reducer/productslice"
import { RootState } from "../redux/store/store"
import { useNavigate } from "react-router-dom"
// import { FormEvent } from "react"

export const Signin = () => {
    const methods = useForm()
    const dispatch = useDispatch<any>();
    const logged=useSelector((store:RootState)=>store.product.logged)
    const navigate=useNavigate()

    useEffect(()=>{
        if(logged){
            navigate("/product")
        }
    },[logged,navigate])
    const handlesubmit=methods.handleSubmit(data=>{
        dispatch(getLoginToken(data))
            .then((res:any)=>{
                if(res.payload==="something went wrong"){
                    alert("wrong email or password")
                }
            })
            .catch((err:any)=>console.log(err))
    })

    const handlelaguage=(e:ChangeEvent<HTMLSelectElement>)=>{
        i18next.changeLanguage(e.target.value)
    }
    return (
        <FormProvider {...methods}>
            <h1>Log in</h1>
            <Dropdown onChange={handlelaguage}/>
            <form onSubmit={handlesubmit} noValidate >
                <div className="vform">
                    <Input {...emailValidation} />
                    <Input {...passwordValidation}/>
                    <button type="submit" className="vbutton">submit</button>
                </div>
                
            </form>
        </FormProvider>
    )
}