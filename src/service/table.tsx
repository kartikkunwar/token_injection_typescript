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
    const { columns, url, filter,  getdata } = props
    const [tableState, setTableState] = useState({
        totalRows: 0,
        search: "",
        tableloader: false,
        // beingSearched:false,
        data: [],
        filtereddata: [],
    });
    const debounceSearch = useDebounce(tableState.search, 500)

    const { totalRows, tableloader, data, filtereddata } = tableState;

    //function to delete table row data
    const deleteData = (data: object) => {
        if (Object.values(data).length) {
            Tableservice.delete(url, pageIndex, pageSize, filter, data)
        }
        
    }

    //using react table and giving data to it 
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, canNextPage, canPreviousPage, previousPage, nextPage, gotoPage, pageCount, selectedFlatRows, setPageSize, state: { sortBy, pageIndex, pageSize } } = useTable(
        {
            columns,
            data: filtereddata.length ? filtereddata : data,
            initialState: { pageIndex: 0 },
            manualSortBy: true,
            manualPagination: true,
            pageCount: totalRows
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
    
    //data to be fetched on page load and on search
    useEffect(() => {
        setTableState((prevState) => ({ ...prevState, tableloader: true }));
        if (!debounceSearch) {
            setTableState((prevState) => ({ ...prevState, beingSearched: false, filtereddata: [] }));
            Tableservice.getDatatest({ url, pageIndex, pageSize, filter })
                .then((res: any) => {
                    setTableState((prevState) => ({
                        ...prevState,
                        tableloader: false,
                        totalRows: Math.ceil(res.data.total / pageSize),
                        data: res.data[Object.keys(res.data)[0]],
                    }));
                })
                .catch((err: any) => console.log(err))
        } else {
            Tableservice.getSearchedDatatest({ url, search: debounceSearch, pageIndex, pageSize, filter }).then((res: any) => {
                setTableState((prevState) => ({
                    ...prevState,
                    data: [],
                    tableloader: false,
                    totalRows: Math.ceil(res.data.total / pageSize),
                    // beingSearched: true,
                    filtereddata: res.data[Object.keys(res.data)[0]],
                }));
            })
                .catch((err: any) => console.log(err))
        }
    }, [debounceSearch, pageIndex, pageSize, filter, url])

    //getting sortBy name and order
    useEffect(() => {
        if (sortBy.length) {
            const sortName = sortBy[0].id.split(" ").join("").toLowerCase()
            const order = sortBy[0].desc ? "desc" : "asc"
            Tableservice.getDatatest({ url, pageIndex, pageSize, filter, sortName, order })
        }
    }, [sortBy])

    //getting row selected and mapping thorough array of object and passing data to parent(page)
    useEffect(() => {
        const selectedRowData = selectedFlatRows?.map(el => el.original)
        getdata(selectedRowData)
    }, [selectedFlatRows])

    return (
        <div className="main">
            <div className="headers">
                <div>
                    <span>Rows per Page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 15, 20, 25, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="search">
                    <input type="text" placeholder="search here..." value={tableState.search || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => setTableState((prevstate) => ({ ...prevstate, search: e.target.value }))} />
                </div>
                <div>
                    <button onClick={() => Tableservice.saveAsExcel(filtereddata.length ? filtereddata : data)} className="button">Export to excel</button>
                    <button onClick={() => Tableservice.checkfordata({ data, filtereddata,  columns })} className="button">Export to PDF</button>
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
                                page.map(row => {
                                    prepareRow(row)
                                    return <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell, ind) => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                    {
                                                        row.cells.length===ind+1&&<div>
                                                            <button >Edit</button>
                                                            <button onClick={()=>deleteData(row.original)}>Delete</button>
                                                        </div>
                                                    }
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
                (data.length !== 0 || filtereddata.length !== 0) && <Pagination page={pageIndex} total={pageCount} gotoPage={gotoPage} previousPage={previousPage} nextPage={nextPage} canNextPage={canNextPage} canPreviousPage={canPreviousPage} />
            }
        </div>
    )
}