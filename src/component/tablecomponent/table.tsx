import { ChangeEvent, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import { Tableservice } from "../../service/tableDataService";
import useDebounce from "../../hooks/useDebounce";



type DataRow = {
    title: string;
    director: string;
    year: string;
};


export const TableItem = () => {
    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
    const [rowsSelected, setRowsSelected] = useState(false)
    const { saveAsPdf, saveAsExcel,getData,getSearchedData }: any = Tableservice

    const debounceSearch = useDebounce(search, 500)


    const coloumns:TableColumn<DataRow>[]=[
        {
            name: 'Id',
            selector: (row:any) => row.id,
            sortable:true
        },
        {
            name: 'Image',
            selector: (row:any) => <img src={row.image} width={50} height={50}/>,
            sortable:false
        },
        {
            name: 'Age',
            selector: (row:any) => row.age,
            sortable:true
        },
        {
            name: 'First Name',
            selector: (row:any) => row.firstName,
            sortable:true
        },
        {
            name: 'Last Name',
            selector: (row:any) => row.lastName,
            sortable:true
        },
        {
            name: 'Email',
            selector: (row:any) => row.email,
            sortable:false
        },
        {
            name:"Action",
            cell:(row:any)=>{
                return(
                    <div>
                        <button onClick={()=>console.log(row)}>Edit</button>
                        <button onClick={()=>console.log(row)}>Delete</button>
                    </div>
                )
            }
        }
    ]
  
    //This will give the data without search and with search as well
    useEffect(() => {
        if (!search.length) {
            setBeingSearched(false)
            setFiltereddata([])
            getData(page,perPage)
                .then((res:any) => {
                    setTotalRows(res.data.total)
                    setData(res.data.users)
                })
                .catch((err:any)=>console.log(err))
        } else {
            if (debounceSearch) getSearchedData(debounceSearch,page,perPage).then((res:any)=>{
                setTotalRows(res.data.total)
            setBeingSearched(true)
            setFiltereddata(res.data.users)
            })
            .catch((err:any)=>console.log(err))
        }
    }, [debounceSearch, page, perPage])

    //sorting functionality

    const handlesort = (column: any, sortDirection: any) => {
        console.log(column, sortDirection)
    }

    //handling number of data per Page
    const handleRowChange = (newPerPage: any) => {
        setPerPage(newPerPage)
    }

    //handling page change 
    const handlePageChange = (page: any) => {
        setPage(page)
    }

    //checking which data to convert to pdf
    const checkfordata = () => {
        if (filtereddata.length) {
            saveAsPdf(filtereddata)
        } else {
            saveAsPdf(data)
        }
    }



    //getting data when selecting single or multiple row
    const getrowdata = (row: any) => {
        console.log(row.selectedRows)
        if (row.selectedRows.length) {
            setRowsSelected(true)
        } else {
            setRowsSelected(false)
        }
    }
    return (
        <div>
            <DataTable columns={coloumns}
                data={beingSearched ? filtereddata : data}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handleRowChange}
                onChangePage={handlePageChange}
                fixedHeader
                fixedHeaderScrollHeight="430px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={<input type="text" placeholder="search here..." className="tablesearch" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} />}
                actions={
                    <div>
                        <button onClick={() => saveAsExcel(beingSearched ? filtereddata : data)}>Export to excel</button>
                        <button onClick={() => checkfordata()}>Export to PDF</button>
                    </div>
                }
                onSort={handlesort}
                sortServer
                onSelectedRowsChange={getrowdata}
            />
        </div>
    )
}