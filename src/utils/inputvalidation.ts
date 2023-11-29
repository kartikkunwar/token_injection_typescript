
interface Validation{
    name:string,
    label:string,
    type:string,
    id:string,
    placeholder:string,
    validation:object,
}
export const emailValidation:Validation={
    name:'username',
    label:'username:',
    type:'email',
    id:'username',
    placeholder:'Enter your email',
    validation:{
        required:{
            value:true,
            message:'required'
        },
        maxLength:{
            value:30,
            message:'30 character max'
        },
        pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:'not valid'
        }
    }

}

export const passwordValidation:Validation={
    name:'password',
    label:'Password:',
    type:'password',
    id:'password',
    placeholder:'Enter your password',
    validation:{
        required:{
            value:true,
            message:'required'
        },
        minLength:{
            value:6,
            message:'minimum 6 characters'
        }
    }
}