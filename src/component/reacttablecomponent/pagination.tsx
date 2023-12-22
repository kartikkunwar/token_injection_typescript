import { useState } from "react";
import { Props } from "../../database";



export const Pagination = (props:Props) => {
    const {pages,totalRows,perPage,changingpage}=props
    const [val,setVal]=useState(0)

    //handle page number on pressing enter
    const handlepagechange = (e: any) => {
        if (e.key === "Enter") {
            if (val <= Math.ceil(totalRows / perPage)) {
                changingpage(val) //passing data from child to parent
            }
        }
    }
    return (
        <div className="paginationbutton">
            <div>
                <span>Showing page {pages} of {Math.ceil(totalRows / perPage)}</span>
            </div>
            <ul className="pagination pagination-md justify-content-end">
                <div className="goto">
                    <span>Go to Page: </span>
                    <input type="number" className="input"  onChange={(e) => setVal(Number(e.target.value))} onKeyDown={handlepagechange} />
                </div>
                <li className="page-item"><button className="page-link butts" disabled={pages === 1} onClick={() => changingpage(1)}>&laquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={pages === 1} onClick={() => changingpage(pages - 1)}>&lsaquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => changingpage(pages + 1)}>&rsaquo;</button></li>
                <li className="page-item"><button className="page-link butts" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => changingpage(Math.ceil(totalRows / perPage))}>&raquo;</button></li>

            </ul>
        </div>
    )
}