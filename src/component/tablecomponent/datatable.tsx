import DataTable, { TableProps } from "react-data-table-component";


function DataTableBase<T>(props: TableProps<T>): JSX.Element {
    
    return (
        <DataTable
            pagination
            dense
            selectableRows
            {...props}
        />
    );
}

export default DataTableBase;