import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "./input";
import { generalschema } from "./schema";
import { Navbar } from "./navbar";
import { useDispatch } from "react-redux";
import { createuser } from "../redux/store/reducer/productslice";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
    const methods = useForm();
    const dispatch = useDispatch<any>();
    const navigate=useNavigate()
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(generalschema), mode: "onTouched" })

    const formsubmit = (data: any) => {
        dispatch(createuser(data))
        .then((res:any)=>{
            if(res.payload==="signup successful"){
                navigate("/")
            }else if(res.payload==="user already exist"){
                alert("user already axist")
            }
        })
        reset()
    }
    // const handlelanguage=(e:ChangeEvent<HTMLSelectElement>)=>{
    //     i18next.changeLanguage(e.target.value)
    // }


    return (
        <>
            <Navbar />
            <h1>Signup</h1>
            <div className="logged">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(formsubmit)}>
                        <div className="insidelogged">
                            <Input name="email" label="Email:" type="email" id="lname" placeholder="enter email here" register={{ ...register('email') }} errormessage={errors.email?.message} />
                            <Input name="password" label="Password:" type="password" id="password" placeholder="enter password here" register={{ ...register('password') }} errormessage={errors.password?.message} />
                            <Input name="confirmpassword" label="Confirm Password:" type="password" id="confirmpassword" placeholder="enter password again" register={{ ...register('confirmpassword') }} errormessage={errors.confirmpassword?.message} />
                            <button type="submit" className="vbutton">Submit</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}