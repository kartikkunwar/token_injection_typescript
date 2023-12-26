
interface IGlobalFilter{
    filter:string,
    setFilter:any,
}
export const GlobalFilter=({filter,setFilter}:IGlobalFilter)=>{
    return (
        <span>
            Search:{' '}
            <input value={filter||""}  onChange={e=>setFilter(e.target.value)}/>
        </span>
    )
}