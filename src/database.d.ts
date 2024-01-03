export interface Igetdata{
    url:string,
    pages:number,
    perPage:number,
    filter:any,
    sortName?:string,
    order?:string
}

export interface Igetsearched extends Igetdata{
    search:string
}

export interface IDataTableBase{
    columns:Array<object>,
    url:string,
    category:string,
    getdata:(arg:T)=>void,
    filter:object,
    theme:boolean
}


export interface ReactTableProps {
    columns: any,
    url: string,
    filter: object,
    getdata:(arg:Array<object>)=>void,
}