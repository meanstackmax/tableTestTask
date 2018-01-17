import React from "react"
import {Table} from "reactstrap"
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";

// export default class DinamicTable extends React.Component {
//     render() {
//         return
//     }
// }
export default ({data, columns, onEditCell, onAddRow, onAddColumn, onEditColumn}) => <Table>
    <thead>
    <tr>
        {columns.map((column, key) =>
            <HeaderCell value={column} onEdit={onEditColumn} key={key} data={{key}}/>
        )}
        <th>
            <i className='fa fa-plus' onClick={onAddColumn}/>
        </th>
    </tr>
    </thead>
    <tbody>
    {data.map((item, rowIndex) =>
        <tr key={rowIndex}>
            {item.map((value, columnIndex) =>
                <Cell key={columnIndex} value={value} onEdit={onEditCell} data={{rowIndex, columnIndex}}/>
            )}
        </tr>)}
    <tr>
        <td><i className='fa fa-plus' onClick={onAddRow}/></td>
    </tr>
    </tbody>
</Table>


