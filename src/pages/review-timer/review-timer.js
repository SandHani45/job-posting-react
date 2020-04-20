import React, { useState, useEffect, useContext } from 'react';
import {
    Radio,
    Select,
    Input,
    Col,
    DatePicker,
    TimePicker,
    Row,
    Button
  } from 'antd';

import moment from 'moment';
// context
import { GlobalContext } from "./../../context/GlobalState";
import {useHistory,useParams} from 'react-router-dom';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  //components
import UiPageHeader from './../../views/UiPageHeader'
import UiGrid from './../../views/UiGrid'
import UiTimerButton from './../../views/UiTimerButton'
//Constants
import Constants from './../../constants'
//scss
import './review-timer.scss'
  
  const { Option } = Select;
  const format = 'HH:mm';
  const { TextArea } = Input;


function ReviewTimer() {
  const history = useHistory();
  const {pendingLaborRecord,panelShop, workCellData, getWorkCell, getPanalShop } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [apiFetchData, setApiFetchData] = useState({
    workCellUpdate:{},
    employeeUpdate:{},
    laborActivityUpdate:{}
  });
  const [laborRecord, setLaborRecord] = useState({
      workOrder: "",
      workCellName: "",
      employee: "",
      laborActivity: "",
      startTime: "",
      startDate:"",
      stopTime:'',
      stopDate:'',
      note:''
    });
    useEffect(() => {
      getWorkCell()
      setLaborRecord({
        workOrder:pendingLaborRecord.WORK_ORDER_NUMBER,
        workCellName: pendingLaborRecord.WORK_CELL_NAME,
        employee: pendingLaborRecord.EMPLOYEE_NAME,
        laborActivity: pendingLaborRecord.WORKCENTER_NAME,
        startTime: "",
        startDate:"",
        stopTime:'',
        stopDate:''
      })
    }, [page]);
    const onChange = (e) => {
      setLaborRecord({ [e.target.name]: e.target.value });
    }
    const onChangeWorkCell = (e) => {
      if(e !== laborRecord.WORK_CELL_NAME ){
        workCellData.map(item =>{
          if(item.WORK_CELL_NAME === e){
            getPanalShop(item.DEPARTMENT_KEY)
            setApiFetchData({employeeUpdate:panelShop})
          }
        })
      }
    }
    const completeStartNew = () =>{
      history.push('/')
    }
    const onSubmit = (e) => {
      e.preventDefault();
      history.push(`/labor-record-complete/${pendingLaborRecord.KEY}`)
    }
    const contentHtml = <>
      {workCellData.length > 0 ? workCellData.map(item=><Option value={item.WORK_CELL_NAME} >{item.WORK_CELL_NAME}</Option>) : null}
    </>;
     const contentHtmlForEmployee = <>
      {panelShop.length > 0 ? panelShop.map(item=>{
        <>
         
            <Option value={item.NAME} >{item.NAME}</Option>
         
        </>
      }) : null}
    </>;
    return (
      <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <form onSubmit={onSubmit} className="labor-record-form">
        <Col className="gutter-row" span={12}>
          <div>
            {console.log(apiFetchData)}
            <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
            <UiGrid title="Work Order" desc="SMS PRESS HIGHT  VOLATAGE">
              <Input placeholder="" name="workOrder" value={pendingLaborRecord.WORK_ORDER_NUMBER} onChange={onChange} />
            </UiGrid>
            <UiGrid title="Customar " number={pendingLaborRecord.CUST_NAME} desc="SMS PRESS HIGHT  VOLATAGE" />
            <UiGrid title="Plant " number={pendingLaborRecord.PLANT_KEY} desc="Electrical" />
            <UiGrid title="Departement " number={pendingLaborRecord.DEPARTMENT_KEY} desc="Panel Shop" />
            <UiGrid title="Work Cell" >
              <Input.Group compact>
                <Select defaultValue={pendingLaborRecord.WORK_CELL_NAME} name="workCellName" onChange={onChangeWorkCell}>
                  {contentHtml}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Employee" >
              <Input.Group compact>
                <Select defaultValue={apiFetchData.employeeUpdate.length > 0 ?  '': pendingLaborRecord.EMPLOYEE_NAME}  name="employee">
                  {contentHtmlForEmployee}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Labor Activity" >
              <Input.Group compact>
              <Select defaultValue={pendingLaborRecord.WORKCENTER_NAME} name="laborActivity">
                <Option value={pendingLaborRecord.WORKCENTER_NAME} onChange={onChange}>{pendingLaborRecord.WORKCENTER_NAME}</Option>
              </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Start Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact >
                    <DatePicker name="startDate"/>
                  </Input.Group>
                </div>
                <div>
                  <TimePicker name="startTime" defaultValue={moment(pendingLaborRecord.START_TIME, format)} format={format} />
                </div>
                <div>
                  <Radio.Group>
                    <Radio value="a">AM</Radio>
                    <Radio value="b">PM</Radio>
                  </Radio.Group>
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Stop Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact>
                    <DatePicker name="stopDate"/>
                  </Input.Group>
                </div>
                <div>
                  <TimePicker name="stopTime" defaultValue={moment(pendingLaborRecord.STOP_TIME, format)} format={format} />
                </div>
                <div>
                  <Radio.Group>
                    <Radio value="a">AM</Radio>
                    <Radio value="b">PM</Radio>
                  </Radio.Group>
                </div>

              </div>
            </UiGrid>
        <UiGrid title="Labor Hours " number={pendingLaborRecord.LABOR_TIME} />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div >
            <p>Note *</p>
            <TextArea rows={4} name="note" onChange={onChange}/>
          </div>
          <div className="check-time-button">
            <input type="submit" className="time-button yellow" value="Complete Tracking" />
            <Button type="primary" className="time-button" onClick={completeStartNew} >Complete Tracking And Start New Job</Button>  
          </div>
        </Col>
        </form>
    </Row>
      </>
    )
}
export default ReviewTimer