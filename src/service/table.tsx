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
    const { columns, url, filter, category, getdata, deleteItem} = props
    
    const [tableState, setTableState] = useState({
        pages: 1,
        totalRows: 0,
        perPage: 10,
        search: "",
        beingSearched: false,
        tableloader: false,
        data: [],
        filtereddata: [],
      });
    const debounceSearch = useDebounce(tableState.search, 500)

    const { pages, totalRows, perPage,  beingSearched, tableloader, data, filtereddata } = tableState; 

    //data to be fetched on page load and on search
    useEffect(() => {
        setTableState((prevState) => ({ ...prevState, tableloader: true }));
        if (!debounceSearch) {
            setTableState((prevState) => ({ ...prevState, beingSearched: false, filtereddata: [] }));
            Tableservice.getData({ url, pages, perPage, filter })
                .then((res: any) => {
                    setTableState((prevState) => ({
                        ...prevState,
                        tableloader: false,
                        totalRows: res.data.total,
                        data: res.data[Object.keys(res.data)[0]],
                      }));
                })
                .catch((err: any) => console.log(err))
        } else {
            Tableservice.getSearchedData({ url, search: debounceSearch, pages, perPage, filter }).then((res: any) => {
                setTableState((prevState) => ({
                    ...prevState,
                    data: [],
                    tableloader: false,
                    totalRows: res.data.total,
                    beingSearched: true,
                    filtereddata: res.data[Object.keys(res.data)[0]],
                  }));
            })
                .catch((err: any) => console.log(err))
        }
        if(Object.values(deleteItem).length){
            Tableservice.delete(url,pages,perPage,filter,deleteItem)
        }
    }, [debounceSearch, pages, perPage, filter, url, deleteItem])

    //using react table and giving data to it 
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows,state:{sortBy}} = useTable(
        {
            columns,
            data: beingSearched ? filtereddata : data,
            manualSortBy: true,
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
    // console.log(sortBy)

    //function to get page number from child(pagination component)
    const changingpage=(val:number)=>{
        setTableState((prevState) => ({ ...prevState, pages: val }));
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
                        onChange={(e) =>setTableState((prevState) => ({ ...prevState, perPage: Number(e.target.value) }))}
                    >
                        {[10, 15, 20, 25, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="search">
                    <input type="text" placeholder="search here..." value={tableState.search} onChange={(e: ChangeEvent<HTMLInputElement>) => {setTableState((prevState) => ({ ...prevState,  search: e.target.value }))}} />
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