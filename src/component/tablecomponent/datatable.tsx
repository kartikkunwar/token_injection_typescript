import DataTable from "react-data-table-component";
import useDebounce from "../../hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import { Tableservice } from "../../service/tableDataService";
import { Circles } from "react-loader-spinner";


function DataTableBase({ coloumn, url, category, getdata, filter }: any): JSX.Element {

    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
    const [rowsSelected, setRowsSelected] = useState(false)
    const debounceSearch = useDebounce(search, 500)
    const [tableloader, setTableloader] = useState(false)

    //data to be fetched on page load and on search
    useEffect(() => {
        setTableloader(true)
        if (!debounceSearch) {
            setBeingSearched(false)
            setFiltereddata([])
            Tableservice.getData(url, page, perPage, filter)
                .then((res: any) => {
                    setTableloader(false)
                    setTotalRows(res.data.total)
                    setData(res.data[Object.keys(res.data)[0]])
                })
                .catch((err: any) => console.log(err))
        } else {
            Tableservice.getSearchedData(url, debounceSearch, page, perPage, filter).then((res: any) => {
                setTableloader(false)
                setTotalRows(res.data.total)
                setBeingSearched(true)
                setFiltereddata(res.data[Object.keys(res.data)[0]])
            })
                .catch((err: any) => console.log(err))
        }
    }, [debounceSearch, page, perPage, filter, url])


    //sorting functionality
    const handlesort = (column: any, sortDirection: any) => {
        const sortBy = column?.name.split(" ").join("").toLowerCase()
        const order = sortDirection
        Tableservice.getData(url, page, perPage, filter, sortBy, order)
    }

    //getting data when selecting single or multiple row
    const getrowdata = (row: any) => {
        if (row.selectedRows.length) {
            setRowsSelected(true)
        } else {
            setRowsSelected(false)
        }
        getdata(row.selectedRows)
    }

    return (
        <DataTable
            columns={coloumn}
            data={beingSearched ? filtereddata : data}
            pagination
            dense
            selectableRows
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={(row: any) => setPerPage(row)}
            onChangePage={(page: any) => setPage(page)}
            fixedHeader
            fixedHeaderScrollHeight="430px"
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={<input type="text" placeholder="search here..." className="tablesearch" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} />}
            actions={
                <div>
                    <button onClick={() => Tableservice.saveAsExcel(beingSearched ? filtereddata : data)}>Export to excel</button>
                    <button onClick={() => Tableservice.checkfordata(data, filtereddata, category)}>Export to PDF</button>
                </div>
            }
            onSort={handlesort}
            sortServer
            onSelectedRowsChange={getrowdata}
            className="table"
            progressPending={tableloader}
            progressComponent={<div className="loader"><Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>}
        />
    );
}

export default DataTableBase;