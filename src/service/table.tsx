import { ChangeEvent, useEffect, useState } from "react"
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table"
import { Tableservice } from "./tableDataService"
import TableCheckBox from "../component/reacttablecomponent/input"
import useDebounce from "../hooks/useDebounce"
import './table.css'
import { Circles } from "react-loader-spinner"
import { Pagination } from "../component/reacttablecomponent/pagination"
import { ReactTableProps } from "../database"


export const ReactTableService = (props: ReactTableProps): JSX.Element => {
    const { columns, url, filter, category,getdata} = props
    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [pages, setPages] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
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
                setData([])
                setTableloader(false)
                setTotalRows(res.data.total)
                setBeingSearched(true)
                setFiltereddata(res.data[Object.keys(res.data)[0]])
            })
                .catch((err: any) => console.log(err))
        }
    }, [debounceSearch, pages, perPage, filter, url])

    //using react table and giving data to it 
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
        {
            columns,
            data: beingSearched ? filtereddata : data,
            state: {

            }
        }, useSortBy, usePagination, useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <TableCheckBox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <TableCheckBox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    );

    //function to get page number from child(pagination component)
    const changingpage=(val:number)=>{
        setPages(val)
    }

    //getting row selected and mapping thorough array of object and passing data to parent(page)
    useEffect(()=>{
        const selectedRowData=selectedFlatRows?.map(el=>el.original)
        getdata(selectedRowData)
    },[selectedFlatRows])

    return (
        <div className="main">
            <div className="headers">
                <div>
                    <span>Rows per Page:</span>
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        {[10, 15, 20, 25, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="search">
                    <input type="text" placeholder="search here..." value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} />
                </div>
                <div>
                    <button onClick={() => Tableservice.saveAsExcel(beingSearched ? filtereddata : data)} className="button">Export to excel</button>
                    <button onClick={() => Tableservice.checkfordata({ data, filtereddata, category })} className="button">Export to PDF</button>
                </div>
            </div>
            {
                tableloader && <div className="loader"><Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></div>
            }
            {
                !data.length && !filtereddata.length && !tableloader && <h3 className="errormsg">There are no records to display</h3>
            }
            {
                !tableloader && (data.length !== 0 || filtereddata.length !== 0) && <div className="table">
                    <table {...getTableProps()}>
                        <thead>
                            {
                                headerGroups.map(el => (
                                    <tr {...el.getHeaderGroupProps()}>
                                        {
                                            el.headers.map((column: any) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render("Header")}
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <span>&darr;</span>
                                                        ) : (
                                                            <span>&uarr;</span>
                                                        )
                                                    ) : (
                                                        ''
                                                    )}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {
                                rows.map(row => {
                                    prepareRow(row)
                                    return <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                (data.length !== 0 || filtereddata.length !== 0) && <Pagination pages={pages} totalRows={totalRows} perPage={perPage} changingpage={changingpage}/>
            }
        </div>
    )
}