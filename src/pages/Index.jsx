import React, {Component} from 'react'

import Layout from "../components/Layout";
import DinamicTable from "../components/DinamicTable";

const table = {
    dataSource: [
        [
            "asdasd",
            23,
            343,
            {
                selected: 'hello',
                items: ["hello", 'rich', 23]
            }

        ],
        [
            "asdasd",
            23,
            343,
        ],
        [
            "asdasd",
            23,
            343,
        ],
        [
            "asdasd",
            23,
            343,
        ],
    ],
    columns: [
        'TEXT',
        'NUMBER 1',
        'NUMBER 2',
        'SUM',
        'DROPDOWN',
    ]
}

export default class Index extends Component {

    state = {
        columns: [],
        dataSource: []
    }

    componentDidMount() {
        const dataSource = table.dataSource
        const columns = table.columns

        dataSource.forEach((item, index) => {
            while (item.length < columns.length) {
                item.push("")
            }
        })
        this.setState({dataSource, columns})
    }

    editCell({target}) {

        const rowIndex = target.dataset.row
        const columnIndex = target.dataset.column
        const fieldValue = target.value

        const {dataSource} = this.state

        if (target.dataset.select) {
            dataSource[rowIndex][columnIndex] = {
                selected: fieldValue,
                items: JSON.parse(target.dataset.select)
            }
        } else {
            dataSource[rowIndex][columnIndex] = fieldValue;
        }


        this.setState({dataSource})
    }

    editColumn({target}) {

        const rowIndex = target.dataset.key
        const fieldValue = target.value

        const {columns} = this.state

        columns[rowIndex] = fieldValue;

        this.setState({columns})
    }

    handleAddColumn() {
        const {columns, dataSource} = this.state

        columns.push('column name')

        dataSource.forEach((item, index) => {
            item.push("")
            return item
        })

        this.setState({columns, dataSource})
    }

    handleAddRow() {
        const {columns, dataSource} = this.state
        dataSource.push(Array(columns.length).fill(""))
        this.setState({dataSource})
    }


    render() {
        const {dataSource} = this.state
        console.log(dataSource)

        return <Layout>
            <DinamicTable
                data={this.state.dataSource}
                onEditColumn={this.editColumn.bind(this)}
                onEditCell={this.editCell.bind(this)}
                columns={this.state.columns}
                onAddColumn={this.handleAddColumn.bind(this)}
                onAddRow={this.handleAddRow.bind(this)}
            />
        </Layout>
    }

}
