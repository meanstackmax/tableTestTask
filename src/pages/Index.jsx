import React, {Component} from 'react'
import {getTable, saveTable} from "../actions/table.action";
import {connect} from "react-redux";
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
@connect((store) => store.table)
export default class Index extends Component {

    timer = null

    componentDidMount() {
        this.props.dispatch(getTable())
    }

    getUpdatedTable(dataSource, columns) {

        clearTimeout(this.timer)
        const data = dataSource.map(item => ({
            text: item[0],
            number1: item[1],
            number2: item[2],
            dropdown: item[4]
        }))

        const table = {
            data,
            columns
        }

        this.timer = setTimeout(() => {
            this.props.dispatch(saveTable(table))
        }, 1000);
    }

    render() {
        const {data,columns} = this.props

        if (!data) return null
        return <Layout>
            <DinamicTable
                columns={columns}
                data={data.map(item => [
                    item.text,
                    item.number1,
                    item.number2,
                    item.number1 + item.number2,
                    item.dropdown
                ])}
                onChange={this.getUpdatedTable.bind(this)}

            />
        </Layout>
    }

}
