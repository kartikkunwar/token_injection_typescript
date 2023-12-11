import { TableItem } from "./tablecomponent/table"
import { Validation } from "./validation"


export const FormValidationTry=()=>{
    
const {errors,handlechange}:any=Validation()
   
    
    const handlesubmit=()=>{

    }
    return(
        <div>
            <h1>form validation</h1>
            <form onSubmit={handlesubmit}>
                <label>Name:</label>
                <input type="text" placeholder="enter name here" name="username"  onChange={handlechange}/>
                {
                    errors?.username&&<span>{errors.username}</span>
                }
                <label>Email:</label>
                <input type="email" placeholder="enter email here" name="email"  onChange={handlechange}/>
                {
                    errors?.email&&<span>{errors.email}</span>
                }
                <label>Password:</label>
                <input type="password" placeholder="enter password here" name="password"  onChange={handlechange}/>
                <label>Phone Number:</label>
                <input type="number" placeholder="enter phone number here" name="phonenumber"  onChange={handlechange}/>
                {
                    errors?.phonenumber&&<span>{errors.phonenumber}</span>
                }
                <button type="submit">Submit</button>
            </form>
            <TableItem />
        </div>
    )
}