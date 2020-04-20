import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';

import axios from 'axios'
class LaborReviewAndPosting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'athlete', field: 'athlete'},
                {headerName: 'age', field: 'age'},
                {headerName: 'country', field: 'country'},
                {headerName: 'year', field: 'year'},
                {headerName: 'date', field: 'date'},
                {headerName: 'sport', field: 'sport'},
                {headerName: 'gold', field: 'gold'},
                {headerName: 'silver', field: 'silver'},
                {headerName: 'bronze', field: 'bronze'},
                {headerName: 'total', field: 'total'}
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                filter: true,
              },
            rowData: [
            ]
        }
    }
    componentDidMount(){
        axios.get(`https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json`).then((res) => {
            this.setState({ rowData: res.data });
            console.log(res.data)
        });
    }
    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{ height: '600px'}}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}
export default LaborReviewAndPosting