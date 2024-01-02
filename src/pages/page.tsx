import { useMemo, useState } from "react"
import { ReactTableService } from "../service/table"
import "./page.css"


export const CheckTable = () => {
   const [reload,setReload]=useState(0)
   const [clientstate,setClientstate]=useState({
    edit:[],
    delete:[]
   })
    const url = "https://dummyjson.com/users"
    const filter = { name: 'a', gender: 'M' };
    const category = "users"
    var x:any=[]

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "id"
        },
        {
            Header: "Image",
            accessor: "image",
            disableSortBy: true,
            Cell: (tableProps: any) => <img src={tableProps.row.original.image} width={50} height={50} alt={tableProps.id} />
        },
        {
            Header: "Age",
            accessor: "age"
        },
        {
            Header: "First Name",
            accessor: "firstName"
        },
        {
            Header: "Last Name",
            accessor: "lastName"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Action",
            Cell: (tableProps: any) => {
                return (
                    <div>
                        <button onClick={() => setClientstate((prevstate)=>({...prevstate,edit:tableProps.row.original}))}>Edit</button>
                        <button onClick={() =>setClientstate((prevstate)=>({...prevstate,delete:tableProps.row.original}))}>Delete</button>
                    </div>
                )
            }
        }
    ], [])
      
   
    //getting selected items from data table
    const getitems = (items: any) => {
        // console.log(items)
    }
    const props = {
        columns,
        url,
        category,
        filter,
        key: reload,
        deleteitem:clientstate.delete,
        getdata: getitems,
    }
    return (
        <div>
            <div className="nav">
                <button className="button" onClick={() => setReload(Math.floor(Math.random() * 10))}>Reload</button>
            </div>
            <ReactTableService {...props} />
        </div>
    )
}