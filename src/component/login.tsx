
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { getLoginToken } from "../redux/action"
import { useNavigate } from "react-router-dom"
import {Dropdown} from "./dropdown"
import {useTranslation} from 'react-i18next'
import i18next from "i18next"
import { RootState } from "../redux/store/store"
import { getLoginToken } from "../redux/store/reducer/productslice"

const init={
    username:"",
    password:""
}
export const Login=()=>{
    const [log,setLog]=useState(init)
    const dispatch = useDispatch<any>();
    const logged=useSelector((store:RootState)=>store.product.logged)
    const navigate=useNavigate()
    const [message,setMessage]=useState(false)
    const [pass,setPass]=useState(false)
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {t}=useTranslation();

    const handlechange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name==="username"){
            if(!mail.test(e.target.value)){
                setMessage(true)
            }else{
                setMessage(false)
            }
        }else if(e.target.name==="password"){
            let val=e.target.value
            if(val.length<5){
                setPass(true)
            }else{
                setPass(false)
            }
        }
        setLog({...log,[e.target.name]:e.target.value})
    }

    const checkdata=()=>{
        if(pass){
           setPass(true)
        }else if(message){
            setMessage(true)
        }else if(log.username===""||log.password===""){
            setMessage(true)
            setPass(true)
        }else{
            setMessage(false)
            setPass(false)
            dispatch(getLoginToken(log))
        }
    }
    const handlelaguage=(e:ChangeEvent<HTMLSelectElement>)=>{
        i18next.changeLanguage(e.target.value)
    }

    useEffect(()=>{
        if(logged){
            navigate("/product")
        }
    },[logged,navigate])

    return(
        <div className="signup">
            <h1>Login</h1>
            <Dropdown onChange={handlelaguage}/>
            <div className="form">
                <div>
                    <label >Username:</label>
                    <input placeholder="enter username here" name="username" type="text" value={log.username} onChange={handlechange} />
                </div>
                {
                    message&&<span>{t('invalid email')}</span>
                }
                <div>
                    <label >Password:</label>
                    <input placeholder="enter password here" name="password" type="text" value={log.password} onChange={handlechange} />
                </div>
                {
                    pass&&<span>{t('length is less than five')}</span>
                }
                <button onClick={checkdata}>Submit</button>
            </div>
        </div>
    )
}