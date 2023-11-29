import { useFormContext } from "react-hook-form"
import { inputerror } from "../utils/inputerror"
import { formvalid } from "../utils/formvalid"
import { useTranslation } from "react-i18next"

interface Props {
    name: string,
    label: string,
    type: string,
    id: string,
    placeholder: string,
    validation: object,
}
export const Input = ({ name, label, type, id, placeholder, validation }: Props) => {
    const { register, formState: { errors } } = useFormContext()
    
    const inputerrors = inputerror(errors, name)
    const isvalid = formvalid(inputerrors)
    return (
        <div className="vbox">
            <div>
                <label htmlFor="id" className="label">{label}</label>
            </div>

            <div>
                <input id={id} className="vinput" type={type} placeholder={placeholder} {...register(name, validation)} />
                {
                    isvalid && <div>
                        <Inputerror message={inputerrors} key={inputerrors} />
                    </div>
                }
            </div>

        </div>
    )
}

const Inputerror = ({ message }: any) => {
    const {t}=useTranslation();

    return (
        <span className="vspan">
            {/* {message.error.message} */}
            {t(message.error.message)}
        </span>
    )
}