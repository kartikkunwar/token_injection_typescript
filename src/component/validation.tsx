import React, { ChangeEventHandler, useState } from "react"


export const Validation=()=>{

    const [form,setForm]=useState({})
    const [errors,setErrors]=useState({})
    const mobileregex=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handlechange:ChangeEventHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault();
        const name=event.target.name;
        const val=event.target.value;
        validate(event,name,val)
        setForm({...form,[name]:val})
        
    }

    const validate=(event:any,name:any,val:any)=>{

        switch(name){
            case 'username':
                if(!val.length){
                    setErrors({...errors,username:"required"})
                }else if(val.length<4){
                    setErrors({...errors,username:'username at least have 4 characters'})
                }else{
                  setErrors(inputerror(errors,name))
                }
                break;

            case "email":
                if(val===""){
                    setErrors({...errors,email:"required"})
                }else if(val.length<7){
                    setErrors({...errors,email:"email must have 7 characters"})
                }
                else if(!emailregex.test(val)){
                    setErrors({...errors,email:"invalid email"})
                }else{
                    setErrors(inputerror(errors,name))
                }
                break;

            case "password":
                if(val===""){
                    setErrors({...errors,password:"required"})
                }else if(val.length<4){
                    setErrors({...errors,password:"password must have 4 characters"})
                }else if(val.length>32){
                    setErrors({...errors,password:"password cannot exceed 32 characters"})
                }else{
                    setErrors(inputerror(errors,name))
                }
                break;
            
            case "confirmpassword":
                if(val===""){
                    setErrors({...errors,confirmpassword:"required"})
                }else if(val.length<4){
                    setErrors({...errors,confirmpassword:"password must have 4 characters"})
                }else if(val.length>32){
                    setErrors({...errors,confirmpassword:"password cannot exceed 32 characters"})
                }else{
                    setErrors(inputerror(errors,name))
                }
                break;
                
            case "phonenumber":
                if(val===""){
                    setErrors({...errors,phonenumber:"required"})
                }else if(val.length<10){
                    setErrors({...errors,phonenumber:"phone number must have 10 digits"})
                }else if(val.length>10){
                    setErrors({...errors,phonenumber:"phone number cannot exceed 10 digits"})
                }else if(val.length===10&&!mobileregex.test(val)){
                    setErrors({...errors,phonenumber:"invalid phone number"})
                }else{
                    setErrors(inputerror(errors,name))
                }
                break;

            case "pincode":
                if(val===""){
                    setErrors({...errors,pincode:"required"})
                }else if(val.length<5){
                    setErrors({...errors,pincode:"pin code cannot be less tha 5 digits"})
                }else if(val.length>5){
                    setErrors({...errors,pincode:"pin code cannnot exceed 5 digits"})
                }else{
                    setErrors(inputerror(errors,name))
                }
                break;
            default:
                break;
        }
    }

    

     function inputerror(errors:any,name:string){

        const filtered=Object.keys(errors)
        .filter(key=>key!==name)
        .reduce((cur:any,key:any)=>{
            cur[key]=errors[key];
            return cur
        },{})
        return filtered
    }

    return {form,errors,handlechange}
   
}