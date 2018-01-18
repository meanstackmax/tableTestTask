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


    render() {
        return <Layout>
            <DinamicTable
                data={table.dataSource}
                columns={table.columns}
            />
        </Layout>
    }

}
