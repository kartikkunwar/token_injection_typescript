import DataTable, { createTheme } from "react-data-table-component";
import useDebounce from "../hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import { Tableservice } from "./tableDataService";
import { Circles } from "react-loader-spinner";
import { IDataTableBase } from "../database";



function DataTableBase(props: IDataTableBase): JSX.Element {
    const { columns, url,  getdata, filter, theme } = props

    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [pages, setPages] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
    const [, setRowsSelected] = useState(false)
    const debounceSearch = useDebounce(search, 500)
    const [tableloader, setTableloader] = useState(false)

    //data to be fetched on page load and on search
    useEffect(() => {
        setTableloader(true)
        if (!debounceSearch) {
            setBeingSearched(false)
            setFiltereddata([])
            Tableservice.getData({ url, pages, perPage, filter })
                .then((res: any) => {
                    setTableloader(false)
                    setTotalRows(res.data.total)
                    setData(res.data[Object.keys(res.data)[0]])
                })
                .catch((err: any) => console.log(err))
        } else {
            Tableservice.getSearchedData({ url, search: debounceSearch, pages, perPage, filter }).then((res: any) => {
                setTableloader(false)
                setTotalRows(res.data.total)
                setBeingSearched(true)
                setFiltereddata(res.data[Object.keys(res.data)[0]])
            })
                .catch((err: any) => console.log(err))
        }
    }, [debounceSearch, pages, perPage, filter, url])


    //sorting functionality
    const handlesort = (column: any, sortDirection: any) => {
        const sortName = column?.name.split(" ").join("").toLowerCase()
        const order = sortDirection
        Tableservice.getData({ url, pages, perPage, filter, sortName, order })
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

    createTheme('custom', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    },);


    const customstyles={
        headCells: {
            style: {
                fontWeight:"bolder",
                fontSize:"20px"
            },
        },
    }
    


    return (
        <DataTable
            columns={columns}
            data={beingSearched ? filtereddata : data}
            customStyles={customstyles}
            pagination
            theme={theme ? "light" : "custom"}
            selectableRows
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={(row: any) => setPerPage(row)}
            onChangePage={(page: any) => setPages(page)}
            fixedHeader
            fixedHeaderScrollHeight="430px"
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={<div className="subheader"><input type="text" placeholder="search here..." className="search" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} /><div className="actionbutton">
                <button onClick={() => Tableservice.saveAsExcel(beingSearched ? filtereddata : data)} className="button">Export to excel</button>
                <button onClick={() => Tableservice.checkfordata({ data, filtereddata, columns })} className="button">Export to PDF</button>
            </div></div>}
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