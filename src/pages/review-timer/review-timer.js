import React, { useState, useEffect, useContext } from 'react';
import {
    Radio,
    Select,
    Input,
    Col,
    DatePicker,
    TimePicker,
    Row,
    Button,
    message
  } from 'antd';

import moment from 'moment';
// context
import { GlobalContext } from "./../../context/GlobalState";
import {useHistory} from 'react-router-dom';
  //components
import UiPageHeader from './../../views/UiPageHeader'
import UiGrid from './../../views/UiGrid'
//Constants
import Constants from './../../constants'
// lodash
import _ from 'lodash'
//scss 
import './review-timer.scss'
  // service
import { getProgressTimeStopService, putPendingLaborService } from './../../service/pendingLabor'
import { getPanelShopService,getWorkOrderService, getLaborActivityService } from './../../service/employee';
import { convertMonthToNumber, convertDateTime } from './../../utile/helpers' 

const { Option } = Select;
const format = 'HH:mm';
const { TextArea } = Input;
const dateFormat = 'DD-MM-YYYY';

const ReviewTimer = () => {
  const history = useHistory();
  const {pendingLaborRecord, workCellData, getWorkCell } = useContext(GlobalContext);
  const [page, setPage] = useState([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);
  const [workOrderNumber, setWorkOrderNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [stopDate, setStopDate] = useState('');
  const [workCell, setWorkCell] = useState('');
  const [employe, setEmploye] = useState('');
  const [workCenterName, setWorkCenterName] = useState('');
  const [laborRate, setRaborRate] = useState(Constants.LABOR_RATE[0]);
  const [employeeUpdate, setEmployeeUpdate] = useState([]);
  const [workCellUpdate, setWorkCellUpdate] = useState(null)

    useEffect(() => {
       getWorkCell()
       getProgressTimeStopService(pendingLaborRecord.KEY).then(res=>{
        setPage(res[0])
        let start = res[0].START_TIME.split(" ");
        let stop = res[0].STOP_TIME.split(" ")
        console.log(convertMonthToNumber(start[0]))
        setStartTime(start[1])
        setStartDate(convertMonthToNumber(start[0]))
        setStopTime(stop[1])
        setStopDate(convertMonthToNumber(stop[0]))
        setWorkCell(res[0].WORK_CELL_NAME)
        setEmploye(res[0].EMPLOYEE_NAME)
        setWorkOrderNumber(res[0].WORK_ORDER_NUMBER);
        setWorkCenterName(res[0].WORKCENTER_NAME)
      });
       getPanelShopService(pendingLaborRecord.DEPARTMENT_KEY).then(res=>{
        setEmployeeUpdate(res)
      })
    }, [1]);

    const onChange = (e) => {
      setNote(e.target.value);
  }
    const onChangeWorkCell = (e) => {
      workCellData.map(item =>{
        if(item.WORK_CELL_NAME === e){
          setWorkCell(e)
          setWorkCellUpdate(item)
          getPanelShopService(item.DEPARTMENT_KEY).then(res=>{
            setEmployeeUpdate(res)
            setEmploye(res[0].NAME)
          })
        }
      })
    }
    const onChangeEmployee = (e) =>{
      let update = workCellData.map(item=>{
        if(e === item.WORK_CELL_NAME){
          return item
        }
      })    
      setEmploye(e)
    }
    const completeStartNew = () =>{
      let start_time = convertDateTime(startDate,startTime)
      let stop_time = convertDateTime(stopDate,stopTime)
      let serviceParams = {
          PLANT_KEY: workCellUpdate === null ? page.PLANT_KEY : workCellUpdate.PLANT_KEY,
          DEPARTMENT_KEY: workCellUpdate === null ? page.DEPARTMENT_KEY : workCellUpdate.DEPARTMENT_KEY,
          EMPLOYEE_KEY: pendingLaborRecord.EMPLOYEE_KEY,
          WORK_CENTER_KEY: pendingLaborRecord.WORK_CENTER_KEY,
          WORK_CELL_KEY: pendingLaborRecord.WORK_CELL_KEY,
          LABOR_CLASS: null,
          WORK_ORDER_NUMBER: workOrderNumber,
          START_TIME: start_time,
          STOP_TIME: stop_time,
          NOTE:note,
          LABOR_TIME: null,
          LABOR_RATE_TYPE: null,
          STATUS: "C"
      }
      putPendingLaborService(pendingLaborRecord.KEY, serviceParams).then((res)=>{
        message.success({ content: 'Successfully Recorded ' });
        history.push('/')
      })
      
    }
    const onChangeStartTime = (time, timeString) =>{
        setStartTime(timeString);
    }
    const onChangeStopTime = (time, timeString) =>{
        setStopTime(timeString);
    }
    const onChangeStartDate = (date, dateString) =>{
        setStartDate(dateString);
    }
    const onChangeStopDate = (date, dateString) =>{
        setStopDate(dateString);
    }
    const onChangeRate = (value) =>{
        setRaborRate(value)
    }
    const onChangeWorkOrder =(e) =>{
      setWorkOrderNumber(e.target.value)
    }
    const onSubmit = (e) => {
      e.preventDefault();
      let start_time = convertDateTime(startDate,startTime)
      let stop_time = convertDateTime(stopDate,stopTime)

      let serviceParams = {
          PLANT_KEY: workCellUpdate === null ? page.PLANT_KEY : workCellUpdate.PLANT_KEY,
          DEPARTMENT_KEY: workCellUpdate === null ? page.DEPARTMENT_KEY : workCellUpdate.DEPARTMENT_KEY,
          EMPLOYEE_KEY: pendingLaborRecord.EMPLOYEE_KEY,
          WORK_CENTER_KEY: pendingLaborRecord.WORK_CENTER_KEY,
          WORK_CELL_KEY: pendingLaborRecord.WORK_CELL_KEY,
          LABOR_CLASS: null,
          WORK_ORDER_NUMBER: workOrderNumber,
          START_TIME: start_time,
          STOP_TIME: stop_time,
          NOTE:note,
          LABOR_TIME: null,
          LABOR_RATE_TYPE: null,
          STATUS: "C"
      }
      if(note.length > 0){
        putPendingLaborService(pendingLaborRecord.KEY, serviceParams).then((res)=>{
          message.success({ content: 'Successfully Recorded ' });
          history.push(`/labor-record-complete/${pendingLaborRecord.KEY}`)
        })
      }else{
        setError(true)
      }
      console.log(serviceParams)
      let serviceParams1 = {
        PLANT_KEY: pendingLaborRecord.PLANT_KEY,
        DEPARTMENT_KEY: pendingLaborRecord.DEPARTMENT_KEY,
        EMPLOYEE_KEY: pendingLaborRecord.EMPLOYEE_KEY,
        WORK_CENTER_KEY: pendingLaborRecord.WORK_CENTER_KEY,
        WORK_CELL_KEY: pendingLaborRecord.WORK_CELL_KEY,
        LABOR_CLASS: null,
        WORK_ORDER_NUMBER: pendingLaborRecord.WORK_ORDER_NUMBER,
        START_TIME: pendingLaborRecord.START_TIME,
        STOP_TIME: pendingLaborRecord.STOP_TIME,
        LABOR_TIME: null,
        LABOR_RATE_TYPE: null,
        STATUS: "C"
    }
      
    }

    const contentHtml = <>
      {workCellData.length > 0 ? workCellData.map((item, index)=><Option key={index} value={item.WORK_CELL_NAME} >{item.WORK_CELL_NAME}</Option>) : null}
    </>;
    const contentHtmlForEmployee = <>
      {employeeUpdate.length > 0 ? employeeUpdate.map((item, index)=><Option key={index} value={item.NAME} >{item.NAME}</Option>) : null}
    </>;
    // const contentHtmlForWorkCenter = <>
    //   {apiFetchData.laborActivityUpdate.length > 0 ? apiFetchData.laborActivityUpdate.map((item, index)=><Option key={index} value={item.CUSTOMER_NAME} >{item.CUSTOMER_NAME}</Option>) : null}
    // </>;
    const contentHtmlForRate = <>
        {Constants.LABOR_RATE.map((item, index)=><Option key={index} value={item} >{item}</Option>)}
    </>;
    
    return (
      <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <form  onSubmit={onSubmit} className="labor-record-form">
        <Col className="gutter-row" span={12}>
          <div>
            <UiPageHeader content={Constants.REVIEW_TIMER} color="green"/>
            <UiGrid title="Work Order">
              <Input placeholder="" name="workOrder" value={workOrderNumber} onChange={onChangeWorkOrder} />
            </UiGrid>
            <UiGrid title="Customar " number={page.CUST_NAME} />
            <UiGrid title="Plant " number={workCellUpdate === null ? page.PLANT_KEY : workCellUpdate.PLANT_KEY}  />
            <UiGrid title="Department" 
              number={workCellUpdate === null ? page.DEPARTMENT_KEY : workCellUpdate.DEPARTMENT_KEY} 
              desc={workCellUpdate === null ? page.DEPARTMENT_NAME : workCellUpdate.DEPARTMENT_NAME} 
            />
            <UiGrid title="Work Cell" >
              <Input.Group compact>
                <Select value={workCell} onChange={onChangeWorkCell}>
                  {contentHtml}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Employee" >
              <Input.Group compact>
                <Select value={employe} onChange={onChangeEmployee}>
                  {contentHtmlForEmployee}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Labor Activity" >
              <Input.Group compact>
                <Select value={workCenterName} >
                  <Option >{workCenterName}</Option>
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Start Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact >
                    <DatePicker onChange={onChangeStartDate} value={moment(startDate, 'DD-MM-YY')} format={dateFormat}/>
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm" onChange={onChangeStartTime} value={moment(startTime, format)} />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Stop Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact>
                    <DatePicker onChange={onChangeStopDate} value={moment(stopDate, dateFormat)} format={dateFormat} />
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm" onChange={onChangeStopTime} value={moment(stopTime, format)} />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Labor Hours" number={pendingLaborRecord.LABOR_TIME} />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
            <div>
              <p>Note *</p>
              <TextArea rows={4} name='note' value={note} onChange={onChange} placeholder="Note" />
              {error && <p className="error-all">Note Required </p>}
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