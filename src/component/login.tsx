import { FormProvider, useForm } from "react-hook-form"
import { Input } from "./input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema"
import { ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store/store"
import { getLoginToken } from "../redux/store/reducer/productslice"
import { Dropdown } from "./dropdown"
import i18next from "i18next"


export const Login = () => {
    const methods = useForm()
    const dispatch = useDispatch<any>();
    const logged=useSelector((store:RootState)=>store.product.logged)
    const navigate=useNavigate()
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(schema), mode: "onTouched" })


    useEffect(()=>{
        if(logged){
            navigate("/product")
        }
    },[logged,navigate])
    
    const formsubmit = (data: any) => {
        dispatch(getLoginToken(data))
            .then((res:any)=>{
                if(res.payload==="something went wrong"){
                    alert("wrong email or password")
                }
            })
            .catch((err:any)=>console.log(err))
        reset()
    }
    const handlelanguage=(e:ChangeEvent<HTMLSelectElement>)=>{
        i18next.changeLanguage(e.target.value)
    }
    return (
        <div className="logged">
            <h1>Login</h1>
            <Dropdown onChange={handlelanguage}/>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(formsubmit)}>
                    <div className="insidelogged">
                        <Input register={{ ...register('username') }} name="username" label="Username:" type="email" id="username" placeholder="enter email here" errormessage={errors.username?.message} />
                        <Input name="password" label="Password:" type="password" id="password" placeholder="enter password here" register={{ ...register('password') }} errormessage={errors.password?.message} />
                        <button type="submit" className="vbutton">submit</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}