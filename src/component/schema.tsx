import * as yup from "yup"

export const generalschema=yup.object({
    fname:yup.string().required("required").min(4,"first name must be at least 4 characters").max(32,"first name must be at most 32 characters"),
    lname:yup.string().required("required").min(4,"last name must be at least 4 characters").max(32,"last name must be at most 32 characters"),
    phonenumber:yup.string().required("required").matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,"invalid phone number"),
    email:yup.string().required("required").email("invalid email").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"),
    password:yup.string().required("required").min(6,"password must be at least 6 characters").max(12,"password must be at most 12 characters"),
    confirmpassword:yup.string().required("required").min(6,"password must be at least 6 characters").max(12,"password must be at most 12 characters").oneOf([yup.ref("password")],"password does not match")
})
export const schema=yup.object({
    username:yup.string().required("required").email("invalid email").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"),
    password:yup.string().required("required").min(6,"password must be at least 6 characters").max(12,"password must be at most 12 characters"),
})