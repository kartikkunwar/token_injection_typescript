import { useMemo } from "react"
import { ReactTable } from "./table"



export const CheckTable=()=>{

    const url = "https://dummyjson.com/users"
    const filter = { name: 'a', gender: 'M' };
    const category = "users"

    const data=[
        {
            id:"1",
            image:"1",
            age:"1",
            firstname:"1",
            lastname:"1",
            email:"1"
        }
    ]

    const columns=useMemo(()=>[
        {
            Header:"Id",
            accessor:"id"
        },
        {
            Header:"Image",
            accessor:"image",
            disableSortBy: true,
            Cell:(tableProps:any)=><img src={tableProps.row.original.image} width={50} height={50} alt={tableProps.id}/>
        },
        {
            Header:"Age",
            accessor:"age"
        },
        {
            Header:"First Name",
            accessor:"firstName"
        },
        {
            Header:"Last Name",
            accessor:"lastName"
        },
        {
            Header:"Email",
            accessor:"email"
        },
        {
            Header:"Action",
            Cell:(tableProps:any)=>{
                return(
                    <div>
                        <button onClick={()=>console.log(tableProps.row.original)}>Edit</button>
                        <button onClick={()=>console.log(tableProps.row.original)}>Delete</button>
                    </div>
                )
            }
        }
    ],[])
    return(
        <ReactTable columns={columns} url={url} filter={filter} category={category}/>
    )
}