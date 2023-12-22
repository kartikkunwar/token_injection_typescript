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