
interface IColumnFilter{
    column:any
}

export const ColumnFilter = ({column}:IColumnFilter) => {
    const {filterValue,setFilter}=column
    return (
        <span>
            <input value={filterValue || ""} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}