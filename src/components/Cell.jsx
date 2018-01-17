import React from 'react'
import {Input} from "reactstrap";

export default class Cell extends React.Component {
    state = {
        editable: false
    }

    render() {
        const {value, onEdit, data} = this.props

        if (Array.isArray(value)) {
            return <td>
                <select className="form-control"
                        data-column={data.columnIndex}
                        data-row={data.rowIndex}
                        onChange={onEdit}
                        value={value}>
                    {value.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </td>
        }


        return <td>
            <Input type='text'
                   placeholder="empty"
                   data-column={data.columnIndex}
                   data-row={data.rowIndex}
                   onChange={onEdit}
                   value={value}/>
        </td>

    }

}