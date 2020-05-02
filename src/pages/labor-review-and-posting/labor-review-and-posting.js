import React, { Component } from 'react';
import { Input, Button, Select, Table ,Menu, Dropdown, message } from 'antd';
import './labor-review-and-posting.scss'
import { getLaborPostingFilterService, getPendingLaborService } from './../../service/pendingLabor'
import Spinner from './../../views/Spinner'
import HamberMenu from './../../views/HamberMenu'
const columns = [
    {title: 'WORK_ORDER_NUMBER', dataIndex: 'WORK_ORDER_NUMBER', key: 'KEY'},
    {title: 'CUST_NAME', dataIndex: 'CUST_NAME', key: 'KEY'},
    {title: 'EMPLOYEE_NAME', dataIndex: 'EMPLOYEE_NAME', key: 'KEY'},
    {title: 'LABOR_CLASS', dataIndex: 'LABOR_CLASS', key: 'KEY'},
    {title: 'WORK_CELL_NAME', dataIndex: 'WORK_CELL_NAME', key: 'KEY'},
    {title: 'START_TIME', dataIndex: 'START_TIME', key: 'KEY'},
    {title: 'STOP_TIME', dataIndex: 'STOP_TIME', key: 'KEY'},
    {title: 'LABOR_TIME', dataIndex: 'LABOR_TIME',key: 'KEY'},
    {title: 'LABOR_RATE_TYPE', dataIndex: 'LABOR_RATE_TYPE',key: 'KEY'},
    {
        title: 'Action',
        key: 'KEY',
        dataIndex: 'KEY',
        render: (text, record) => (
        <HamberMenu keyValue={text} data={record} />
        )
    }
  ];
class LaborReviewAndPosting extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            selectedRowKeys: [], // Check here to configure the default column
            inputValue:{
                workOrder:''
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    componentDidMount(){
        getPendingLaborService(this.state.inputValue.workOrder)
        .then((res) => this.setState({ rowData: res }))
        .catch(error => console.log(error))
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
        const { selectedRowKeys, inputValue } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
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
                {<Table rowKey={record => record.KEY} rowSelection={rowSelection} columns={columns} dataSource={this.state.rowData} />}
            </div>
        );
    }
}
export default LaborReviewAndPosting