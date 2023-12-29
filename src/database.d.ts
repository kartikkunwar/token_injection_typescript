export interface Table{
    dataToPrint:Array<object>,
    category:string
}

export interface Igetdata{
    url:string,
    pages:number,
    perPage:number,
    filter:any,
    sortBy?:string,
    order?:string
}

export interface Igetsearched extends Igetdata{
    search:string
}

export interface Icheckdata{
    data:object[],
    filtereddata:object[],
    category:string
}

export interface IDataTableBase{
    coloumn:Array<object>,
    url:string,
    category:string,
    getdata:(arg:T)=>void,
    filter:object,
    theme:boolean
}

export interface Props{
    pages:number;
    totalRows:number;
    perPage:number;
    changingpage:any
}

export interface ReactTableProps {
    columns: any,
    url: string,
    filter: object,
    category: string,
    getdata:(arg:Array<object>)=>void,
    deleteItem:object
}