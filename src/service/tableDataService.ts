import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"
import { Icheckdata, Igetdata, Igetsearched, Table } from "../database";




export const Tableservice={
    //function for exporting data as pdf file
    saveAsPdf:function(arg:Table):void{
    const {dataToPrint,category}=arg;
        var col;
        var rows;
        console.log(arg)
        switch(category){
            case "users":
                 col=[['Id', 'Image', 'Age', 'First Name', 'Last Name', 'Email']];
                 rows=dataToPrint.map((el: any) => {
                    return [el.id, el.image, el.age, el.firstName, el.lastName, el.email]
                    
                })
                 break;
            case "products":
                col=[['Id', 'Image', 'Title', 'Brand', 'Category', 'Price']];
                 rows=dataToPrint.map((el: any) => {
                    return [el.id, el.thumbnail, el.title, el.brand, el.category, el.price]
                    
                })
                 break;
        }
        const doc = new jsPDF({ orientation: 'landscape' });

        autoTable(doc, {
            head: col,
            body: rows,
        })
        // doc.save("data.pdf")
    },


    //function for exporting data as excel file
    saveAsExcel:function(data:Array<object>):void{
        var wb=XLSX.utils.book_new(),
        ws=XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb,ws,"DataSheet");
        XLSX.writeFile(wb,"Data.xlsx");
    },

    //api call for getting data per page
    getData : async (args:Igetdata) => {
        const {url,page,perPage,filter,sortBy,order}=args
        const query={
            params:{
                limit:perPage,
                skip:(page*perPage)-perPage,
                sortBy,
                order,
                name:filter.name,
                gender:filter.gender
            }
        }
        try {
            const res = await axios.get(`${url}`,query)
            return res
        } catch (err) {
            return err
        }
    },

    //api call for search functionality
    getSearchedData : async (args:Igetsearched) => {
        const {url,search,page,perPage,filter}=args
        try {
            const res = await axios.get(`${url}/search?q=${search}&limit=${perPage}&skip=${(page * perPage) - perPage}`,{params:filter})
            return res
        } catch (err) {
            return err
        }
    },


    //giving data to export as pdf on condition
    checkfordata : (args:Icheckdata) => {
        const {data,filtereddata,category}=args
        if (filtereddata.length) {
            Tableservice.saveAsPdf({dataToPrint:filtereddata,category})
        } else {
            Tableservice.saveAsPdf({dataToPrint:data,category})
        }
    }
}