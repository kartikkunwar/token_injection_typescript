import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"


export const Tableservice={

    //function for exporting data as pdf file
    saveAsPdf:function(dataToPrint: any){
        const doc = new jsPDF({ orientation: 'landscape' });
        var col: any = [['Id', 'Image', 'Age', 'First Name', 'Last Name', 'Email']];
        const rows=dataToPrint.map((el: any) => {
            return [el.id, el.image, el.age, el.firstName, el.lastName, el.email]
            
        })

        autoTable(doc, {
            head: col,
            body: rows,
        })
        doc.save("data.pdf")
    },

    //function for exporting data as excel file
    saveAsExcel:function(data:any){
        var wb=XLSX.utils.book_new(),
        ws=XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb,ws,"DataSheet");
        XLSX.writeFile(wb,"Data.xlsx");
    },

    //api call for getting data per page
    getData : async (...args:any) => {
        const [page,perPage]=args
        try {
            const res = await axios.get(`https://dummyjson.com/users?limit=${perPage}&skip=${(page*perPage)-perPage}`)
            return res
        } catch (err) {
            console.log('')
        }
    },

    //api call for search functionality
    getSearchedData : async (...args:any) => {
        const [search,page,perPage]=args
        try {
            const res = await axios.get(`https://dummyjson.com/users/search?q=${search}&limit=${perPage}&skip=${(page * perPage) - perPage}`)
            return res
        } catch (err) {
            console.log(err)
        }
    }
}