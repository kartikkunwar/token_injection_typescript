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
        selector: (row: any) => {return (<img src={row.image} width={50} height={50} alt={row.id}/>)},
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
                    <button onClick={() => console.log(row)}>Edit</button>
                    <button onClick={() => console.log(row)}>Delete</button>
                </div>
            )
        }
    }
]