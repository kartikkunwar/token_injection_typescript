import DataTableBase from "../component/tablecomponent/datatable"
import { ChangeEvent, useEffect, useState } from "react";
import { Tableservice } from "../service/tableDataService";
import useDebounce from "../hooks/useDebounce";
import { coloumn } from "../utils/try";


export const UserTable = () => {
    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
    const [rowsSelected, setRowsSelected] = useState(false)
    const debounceSearch = useDebounce(search, 500)
    

    //data to be fetched on page load and on search
    useEffect(() => {
        if (!debounceSearch.length) {
            setBeingSearched(false)
            setFiltereddata([])
            Tableservice.getData(page, perPage)
                .then((res: any) => {
                    setTotalRows(res.data.total)
                    setData(res.data.users)
                })
                .catch((err: any) => console.log(err))
        } else {
            if (debounceSearch) Tableservice.getSearchedData(debounceSearch, page, perPage).then((res: any) => {
                setTotalRows(res.data.total)
                setBeingSearched(true)
                setFiltereddata(res.data.users)
            })
                .catch((err: any) => console.log(err))
        }
    }, [debounceSearch, page, perPage])
    

    //handling number of data per Page
    const handleRowChange = (newPerPage: any) => {
        setPerPage(newPerPage)
    }

    //handling page change 
    const handlePageChange = (page: any) => {
        setPage(page)
    }

    //sorting functionality
    const handlesort = (column: any, sortDirection: any) => {
        console.log(column, sortDirection)
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
            <DataTableBase
                columns={coloumn}
                data={beingSearched ? filtereddata : data}
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handleRowChange}
                onChangePage={handlePageChange}
                fixedHeader
                fixedHeaderScrollHeight="430px"
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={<input type="text" placeholder="search here..." className="tablesearch" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} />}
                actions={
                    <div>
                        <button onClick={() => Tableservice.saveAsExcel(beingSearched ? filtereddata : data)}>Export to excel</button>
                        <button onClick={() => Tableservice.checkfordata(data,filtereddata)}>Export to PDF</button>
                    </div>
                }
                onSort={handlesort}
                sortServer
                onSelectedRowsChange={getrowdata}
            />
        </div>
    )
}