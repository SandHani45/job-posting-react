import React, { Component } from 'react';
import { Input, Button, Select, Table ,Menu, Dropdown, message } from 'antd';
import './labor-review-and-posting.scss'
import { getLaborPostingFilterService, getPendingLaborService, deletePendingLaborService } from './../../service/pendingLabor'
import Spinner from './../../views/Spinner'
import MaintenancePageDetailDropdown from './../../views/MainHamber/MaintenancePageDetailDropdown'
import { AgGridReact } from 'ag-grid-react'

class LaborReviewAndPosting extends Component {
    constructor(props) {
        super(props);
        const { match, permissions } = this.props
        this.state = {
          columnDefs: [
            {
              headerName: 'KEY',
              field: 'KEY',
              pinned: true,
              cellClass: ['lock-pinned', 'stringType'],
              width: 125,
              filter: 'agTextColumnFilter',
            },
            {
              headerName: 'WORK_ORDER_NUMBER',
              field: 'WORK_ORDER_NUMBER',
              pinned: true,
              cellClass: ['lock-pinned', 'stringType'],
              width: 125,
              filter: 'agTextColumnFilter',
            },
            {
              headerName: 'CUST_NAME',
              field: 'CUST_NAME',
              width: 200,
              filter: 'agTextColumnFilter',
            },
            {
              headerName: 'EMPLOYEE_NAME',
              field: 'EMPLOYEE_NAME',
              width: 200,
              filter: 'agTextColumnFilter',
            },
            {
              headerName: 'LABOR_CLASS',
              field: 'LABOR_CLASS',
              cellStyle: { textAlign: 'center' },
              width: 150,
              filter: 'agNumberColumnFilter',
              tooltipField: 'LABOR_CLASS',
            },
            {
              headerName: 'WORK_CELL_NAME',
              field: 'WORK_CELL_NAME',
              cellStyle: { textAlign: 'center' },
              width: 145,
              filter: 'agNumberColumnFilter',
              tooltipField: 'WORK_CELL_NAME',
            },
            {
              headerName: 'START_TIME',
              field: 'START_TIME',
              cellStyle: { textAlign: 'left' },
              filter: 'agTextColumnFilter',
              width: 190,
            },
            {
              headerName: 'STOP_TIME',
              field: 'STOP_TIME',
              cellStyle: { textAlign: 'left' },
              filter: 'agTextColumnFilter',
              width: 190,
            },
            {
              headerName: 'LABOR_TIME',
              field: 'LABOR_TIME',
              cellStyle: { textAlign: 'center' },
              width: 150,
              sort: 'desc',
            },
            {
              headerName: 'LABOR_RATE_TYPE',
              field: 'LABOR_RATE_TYPE',
              cellStyle: { textAlign: 'center' },
              width: 150,
              sort: 'desc',
            },
            {
              headerName: null,
              cellStyle: { border: '0px' },
              cellRendererFramework: row => (
                <MaintenancePageDetailDropdown
                  itemKey={row.data.KEY}
                  allowDelete={true}
                  allowEdit={true}
                  deleteTooltip="Sales Classes cannot be deleted"
                />
              ),
              width: 50,
              pinned: 'right',
              sortable: false,
              filter: false,
              menuTabs: [],
              resizable: false,
              selectable: false,
            },
          ],
          defaultColDef: { sortable: true, filter: true, resizable: true, menuTabs: ['filterMenuTab'] },
          rowData: [],
          errors: [],
          printMode: /print/g.test(match),
          inputValue:{
            workOrder:''
          }
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    componentDidMount(){
        getPendingLaborService(this.state.inputValue.workOrder)
        .then(this.assignListingData)
        .catch(error => console.log(error))
    }
    assignListingData = rowData => {
      if (rowData) {
        const formattedrowData = rowData.map(data => {
          return {
            KEY:data.KEY,
            WORK_ORDER_NUMBER: data.WORK_ORDER_NUMBER,
            CUST_NAME: data.CUST_NAME,
            EMPLOYEE_NAME: data.EMPLOYEE_NAME,
            LABOR_CLASS: data.LABOR_CLASS,
            WORK_CELL_NAME: data.WORK_CELL_NAME,
            START_TIME: data.START_TIME,
            STOP_TIME: data.STOP_TIME,
            LABOR_TIME: data.LABOR_TIME,
            LABOR_RATE_TYPE: data.LABOR_RATE_TYPE
          }
        })
        this.setState({ rowData: formattedrowData })
      }
    }

    handleError = (e, title) => {
      const { errors } = this.state
      const { setErrorState } = this.props
      let errorData
      const currentActivity = 'selecting Data to Display Sales Class Listing'
      if (e.data) {
        errorData = { ...e.data, currentActivity }
      } else {
        errorData = {
          title,
          sourceType: 'Network',
          details: e.toString(),
          sourceName: 'SalesClassListing.js',
          currentActivity,
          timestamp: Date().toString(),
        }
      }
      console.log(e)
      errors.push(errorData)
      this.setState({ errors })
      // setErrorState()
    }

    handleClick(event) {
        event.preventDefault();
        getLaborPostingFilterService(this.state.inputValue.workOrder)
        .then((res) => this.setState({ rowData: res }))
        .catch(error => console.log(error))
    }
    onChangeHandler(event){
        this.setState({
            inputValue:{
                workOrder:event.target.value
            }
        })
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
      const { Option } = Select;
      const { columnDefs, defaultColDef, rowData, errors, printMode, selectedRowKeys, inputValue } = this.state
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };
      const gridOptions = {
        domLayout: printMode ? 'print' : 'normal',
        popupParent: document.querySelector('body')
        // rowClassRules: {
        //   'inactive-row-item': params => params.data.ACTIVE_SALES_CLASS !== 'Yes',
        // },
      }
      return errors.length ? (
            ""
          ) : (
            <div
            className="ag-theme-balham"
            style={{ height: '600px'}}
        >
            <div className="labor-review-filter">
                <div className="__work-order">
                    <div className="__mr-2">
                        <p>Plant</p>
                    </div>
                    <div>
                    <Input.Group compact>
                        <Select defaultValue={'All'}  name="plant">
                            <Option value="one" >{"one"}</Option>
                        </Select>
                    </Input.Group>
                    </div>
                </div>
                <div className="__work-order mt-2 mb-2">
                    <div className="__mr-1">
                        <p>Work Order</p>
                    </div>
                    <div>
                        <Input name="workOrder" onChange={this.onChangeHandler} value={inputValue.workOrder} />
                    </div>
                    <div className="ml-10">
                        <Button type="primary" onClick={this.handleClick}>Enter</Button>
                    </div>
                </div>
            </div>
            <AgGridReact
              animateRows
              suppressRowClickSelection
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowData={rowData}
              gridOptions={gridOptions}
              scrollbarWidth={8}
            />
        </div>
      )
    }
}
export default LaborReviewAndPosting