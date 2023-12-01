import { FormProvider, useForm } from "react-hook-form"
import { Input } from "./input";
import { yupResolver } from "@hookform/resolvers/yup";
import { generalschema } from "./schema";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { edituserinfo } from "../redux/store/reducer/productslice";

export const ChangePass=()=>{
    const methods=useForm();
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(generalschema), mode: "onTouched" })
    const dispatch=useDispatch<any>()
    const navigate=useNavigate()
    const {id}=useParams()

    const formsubmit = (data: any) => {
        const mydata={...data,id:id}
        dispatch(edituserinfo(mydata))
        .then((res:any)=>{
            alert("password changed successfully")
            navigate("/")
        })
         reset()
     }

    return(
        <div className="logged">
            <h1>Login</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(formsubmit)}>
                    <div className="insidelogged">
                        <Input register={{ ...register('password') }} name="password" label="Password:" type="password" id="password" placeholder="enter password here" errormessage={errors.password?.message} />
                        <Input register={{ ...register('confirmpassword') }} name="confirmpassword" label="Confirm Password:" type="password" id="confirmpassword" placeholder="enter password again" errormessage={errors.confirmpassword?.message} />
                        <button type="submit" className="vbutton">submit</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}