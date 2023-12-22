import { useState } from "react";
import DataTableBase from "../service/datatable"
import { TableColumn } from "react-data-table-component";


type DataRow = {
    title: string;
    director: string;
    year: string;
};

export const coloumn: TableColumn<DataRow>[] = [
    {
        name: 'Id',
        selector: (row: any) => row.id,
        sortable: true
    },
    {
        name: 'Image',
        selector: (row: any) => { return (<img src={row.image} width={50} height={50} alt={row.id} />) },
        sortable: false
    },
    {
        name: 'Age',
        selector: (row: any) => row.age,
        sortable: true
    },
    {
        name: 'First Name',
        selector: (row: any) => row.firstName,
        sortable: true
    },
    {
        name: 'Last Name',
        selector: (row: any) => row.lastName,
        sortable: true
    },
    {
        name: 'Email',
        selector: (row: any) => row.email,
        sortable: false
    },
    {
        name: "Action",
        cell: (row: any) => {
            return (
                <div>
                    <button onClick={() => console.log(row)} className="button">Edit</button>
                    <button onClick={() => console.log(row)} className="button">Delete</button>
                </div>
            )
        }
    }
]

export const UserTable = () => {
    const [reload, setReload] = useState(0)
    const [theme, setTheme] = useState(true)
    const filter = { name: 'a', gender: 'M' };
    const url = "https://dummyjson.com/users"
    const category = "users"

    //getting selected items from data table
    const getitems = (items: any) => {
        console.log(items)
    }

    const props = {
        coloumn,
        url,
        category,
        filter,
        key: reload,
        theme,
        getdata: getitems
    }
    return (
        <div className="datatable">
            <div className="nav">
                <button onClick={() => setReload(Math.floor(Math.random() * 10))}>Reload</button>
                <button onClick={() => setTheme(!theme)}>change theme</button>
            </div>
            <DataTableBase {...props} />
        </div>
    )
}