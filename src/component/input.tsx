import { useTranslation } from "react-i18next";

interface Props {
    name: string,
    label: string,
    type: string,
    id: string,
    placeholder:string,
    register:any,
    errormessage:any
}

export const Input=({ name, label, type, id, placeholder, errormessage, register  }: Props)=>{
    const {t}=useTranslation();
    return(
        <div className="insidelogged">
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} {...register}/>
            <span>{t(errormessage)}</span>
        </div>
    )
}