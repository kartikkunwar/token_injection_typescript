import { useMemo, useState } from "react"
import { ClientTableService } from "../service/clientSideTable"


export const Client = () => {
    const [clientState, setClientstate] = useState({
        reload:0,
        edit:[],
        delete:[]
    })
    const url = "https://dummyjson.com/users?limit=100"
    const category = "users"

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "id",
            disableFilters:true
        },
        {
            Header: "Image",
            accessor: "image",
            disableSortBy: true,
            Cell: (tableProps: any) => <img src={tableProps.row.original.image} width={50} height={50} alt={tableProps.id} />,
            disableFilters:true
        },
        {
            Header: "Age",
            accessor: "age",
            disableFilters:true
        },
        {
            Header: "First Name",
            accessor: "firstName",
        },
        {
            Header: "Last Name",
            accessor: "lastName",
        },
        {
            Header: "Email",
            accessor: "email",
            disableFilters:true
        },
        {
            Header: "Action",
            Cell: (tableProps: any) => {
                return (
                    <div>
                        <button onClick={() => console.log(tableProps.row.original)}>Edit</button>
                        <button onClick={() => console.log(tableProps.row.original)}>Delete</button>
                    </div>
                )
            },
            disableFilters:true
        }
    ], [])
  

    //getting selected items from data table
    const getitems = (items: any) => {
        console.log(items)
    }

    const props = {
        columns,
        url,
        category,
        key: clientState.reload,
        getdata: getitems
    }
    return (
        <div>
            <div className="nav">
                <button className="button" onClick={() =>setClientstate((prevstate)=>({...prevstate,reload:Math.floor(Math.random() * 10)}))}>Reload</button>
            </div>
            <ClientTableService {...props} />
        </div>
    )
}