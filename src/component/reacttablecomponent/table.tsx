import { ChangeEvent, useEffect, useState } from "react"
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table"
import { Tableservice } from "../../service/tableDataService"
import TableCheckBox from "./input"
import useDebounce from "../../hooks/useDebounce"
import './table.css'
import { Circles } from "react-loader-spinner"

interface ReactTableProps {
    columns: any,
    url: string,
    filter: object,
    category: string
}

export const ReactTable = (props: ReactTableProps) => {
    const { columns, url, filter, category } = props
    const [data, setData] = useState([])
    const [filtereddata, setFiltereddata] = useState([])
    const [pages, setPages] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [beingSearched, setBeingSearched] = useState(false);
    const debounceSearch = useDebounce(search, 500)
    const [tableloader, setTableloader] = useState(false)
    const [val, setVal] = useState(0)

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

    const handlepagechange = (e: any) => {
        if (e.key === "Enter") {
            if (val <= Math.ceil(totalRows / perPage)) {
                setPages(val)
            }
        }
    }

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
                                    return <tr {...row.getRowProps()} onClick={() => { console.log(' row click ', row) }}>
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
                (data.length !== 0 || filtereddata.length !== 0) && <div className="paginationbutton">
                    <div>
                        <span>Showing page {pages} of {Math.ceil(totalRows / perPage)}</span>
                    </div>
                    <ul className="pagination pagination-md justify-content-end">
                        <div className="goto">
                            <span>Go to Page: </span>
                            <input type="number" className="input" placeholder={String(pages)} onChange={(e) => setVal(Number(e.target.value))} onKeyDown={handlepagechange} />
                        </div>
                        <li className="page-item"><button className="page-link butts" disabled={pages === 1} onClick={() => setPages(1)}>&laquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={pages === 1} onClick={() => setPages(pages - 1)}>&lsaquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => setPages(pages + 1)}>&rsaquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => setPages(Math.ceil(totalRows / perPage))}>&raquo;</button></li>

                    </ul>
                </div>
            }
        </div>
    )
}