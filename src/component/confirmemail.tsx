import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, useForm } from "react-hook-form"
import { generalschema } from "./schema"
import { Input } from "./input"
import { useDispatch } from "react-redux"
import { confirmmail } from "../redux/store/reducer/productslice"
import { Navbar } from "./navbar"

export const ConfirmEmail = () => {
    const methods = useForm()
    const dispatch = useDispatch<any>()
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(generalschema), mode: "onTouched" })

    const formsubmit = (data: any) => {
        dispatch(confirmmail(data))
        .then((res:any)=>{
            if(res.payload==="mail sent to registered email"){
                alert("reset password link sent to registered mail id")
            }
        })
        reset()
    }
    return (
        <>
            <Navbar />
            <div className="logged">
                <h1>Confirm Mail</h1>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(formsubmit)}>
                        <div className="insidelogged">
                            <Input register={{ ...register('email') }} name="username" label="Username:" type="email" id="username" placeholder="enter email to reset password" errormessage={errors.email?.message} />
                            <button type="submit" className="vbutton">submit</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}