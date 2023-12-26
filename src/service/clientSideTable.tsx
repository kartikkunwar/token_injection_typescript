import { useEffect, useMemo, useState } from "react"
import { usePagination, useRowSelect, useSortBy, useTable, useGlobalFilter, useFilters } from "react-table"
import { Tableservice } from "./tableDataService"
import TableCheckBox from "../component/reacttablecomponent/input"
import "./clientSideTable.css"
import { Circles } from "react-loader-spinner"
import { GlobalFilter } from "../component/clientsidecomponent/globalfilter"
import { ColumnFilter } from "../component/clientsidecomponent/columnfilter"

interface IClientTableProps {
    columns: any,
    url: string,
    category: string,
    getdata: (arg: Array<object>) => void,
}
export const ClientTableService = (props: IClientTableProps): JSX.Element => {
    const { columns, url, category, getdata } = props
    const [data, setData] = useState([])
    const [tableloader, setTableloader] = useState(false)

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: ColumnFilter,
        }),
        []
    )

    //data to be fetched on page load and on search
    useEffect(() => {
        setTableloader(true)
        Tableservice.clientData(url)
            .then((res: any) => {
                setTableloader(false)
                setData(res.data[Object.keys(res.data)[0]])
            })
            .catch((err: any) => console.log(err))
    }, [url])

    //using react table and giving data to it 
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, selectedFlatRows, state, setGlobalFilter, page, pageCount, gotoPage, pageOptions, nextPage, previousPage, setPageSize, canNextPage, canPreviousPage } = useTable(
        {
            columns,
            data: data,
            defaultColumn
        }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
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



    const { globalFilter, pageIndex, pageSize } = state

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
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <div>
                    {/* <button onClick={() => Tableservice.saveAsExcel( data)} className="button">Export to excel</button>
                    <button onClick={() => Tableservice.checkfordata({ data, category })} className="button">Export to PDF</button> */}
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
                !data.length && !tableloader && <h3 className="errormsg">There are no records to display</h3>
            }
            {
                !tableloader && (data.length !== 0) && <div className="table">
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
                                                    <div>
                                                        {column.canFilter ? column.render("Filter") : null}
                                                    </div>
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
            <div className="clientpagination">
                <div>
                    <span>
                        Page{' '}
                        <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input type="number" className="input" defaultValue={pageIndex + 1} onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} />
                    </span>
                </div>
                <div>
                    <ul className="pagination pagination-md justify-content-end">
                        <li className="page-item"><button className="page-link butts" disabled={!canPreviousPage} onClick={() => gotoPage(0)}>&laquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={!canPreviousPage} onClick={() => previousPage()}>&lsaquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={!canNextPage} onClick={() => nextPage()}>&rsaquo;</button></li>
                        <li className="page-item"><button className="page-link butts" disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>&raquo;</button></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}