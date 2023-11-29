import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "./input";
import { generalschema } from "./schema";



export const Signup = () => {
    const methods = useForm();
    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(generalschema), mode: "onTouched" })

    const formsubmit = (data: any) => {
        console.log(data)
        reset()
    }
    // const handlelanguage=(e:ChangeEvent<HTMLSelectElement>)=>{
    //     i18next.changeLanguage(e.target.value)
    // }


    return (
        <>
            <h1>Signup</h1>
            <div className="logged">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(formsubmit)}>
                        <div className="insidelogged">
                            <Input name="fname" label="First name:" type="text" id="fname" placeholder="enter first name here" register={{ ...register('fname') }} errormessage={errors.fname?.message} />
                            <Input name="lname" label="Last name:" type="text" id="lname" placeholder="enter last name here" register={{ ...register('lname') }} errormessage={errors.lname?.message} />
                            <Input name="phonenumber" label="Phone number:" type="number" id="phonenumber" placeholder="enter number here" register={{ ...register('phonenumber') }} errormessage={errors.phonenumber?.message} />
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