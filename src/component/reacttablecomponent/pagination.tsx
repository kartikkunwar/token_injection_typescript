import { useState } from "react";

// interface Props{
//     pages:number;
//     totalRows:number;
//     perPage:number;
//     changingpage:any
// }


export const Pagination = (props:any) => {
    const {page,total,gotoPage,previousPage,nextPage,canNextPage,canPreviousPage}=props
    const [val,setVal]=useState(0)

    //handle page number on pressing enter
    const handlepagechange = (e: any) => {
        if (e.key === "Enter") {
            if (val <= total) {
                gotoPage(val-1) //passing data from child to parent
            }
        }
    }
    return (
        <div className="paginationbutton">
            <div>
                <span>Showing page {page+1} of {total}</span>
            </div>
            <ul className="pagination pagination-md justify-content-end">
                <div className="goto">
                    <span>Go to Page: </span>
                    <input type="number" className="input"  onChange={(e) => setVal(Number(e.target.value))} onKeyDown={handlepagechange} />
                </div>
                <li className="page-item"><button className="page-link butts" disabled={!canPreviousPage} onClick={() => gotoPage(0)}>&laquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={!canPreviousPage} onClick={() => previousPage()}>&lsaquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={!canNextPage} onClick={() => nextPage()}>&rsaquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={!canNextPage} onClick={() => gotoPage(total - 1)}>&raquo;</button></li>

            </ul>
        </div>
    )
}