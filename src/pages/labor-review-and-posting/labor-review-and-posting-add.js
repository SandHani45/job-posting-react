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
import {useHistory,useParams} from 'react-router-dom';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  //components
import UiPageHeader from './../../views/UiPageHeader'
import { convertMonthToNumber, convertDateTime } from './../../utile/helpers' 
import UiGrid from './../../views/UiGrid'
//Constants
import Constants from './../../constants'
//scss 
import './labor-review-and-posting.scss'
  // service
import { getProgressTimeStopService, putPendingLaborService } from './../../service/pendingLabor'
import { getPanelShopService,getWorkOrderService, getWorkCellService } from './../../service/employee';

const { Option } = Select;
const format = 'HH:mm';
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

const LaborReviewAndPostingAdd = () => {
  const history = useHistory();
  const {pendingLaborRecord,panelShop, workCellData, getWorkCell, getPanalShop, getPendingLaborRecord } = useContext(GlobalContext);
  const [customar, setCustomar] = useState('');
  const [page, setPage] = useState([]);
  const [note, setNote] = useState('');
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
  const [workCellUpdate, setWorkCellUpdate] = useState([])
  const [laborActivityUpdate, setLaborActivityUpdate] = useState([])
  let { id } = useParams();
    useEffect(() => {
      getWorkCellService().then(res=>{
        setWorkCell(res[0].WORK_CELL_NAME)
        setWorkCellUpdate(res)
      })
    }, [1]);
    const onChangeWorkCell = (e) => {
      workCellUpdate.map(item =>{
        if(item.WORK_CELL_NAME === e){
          setWorkCell(e)
          getPanelShopService(item.DEPARTMENT_KEY).then(res=>{
            setWorkCenterName(res[0].DESCRIPTION)
            setEmployeeUpdate(res)
            setEmploye(res[0].NAME)
          })
        }
      })
    }
    const onChangeCustomar = (e) =>{
      setCustomar(e.target.value);
    }
    const onChange = (e) => {
      setNote(e.target.value);
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
      history.push('/')
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
      getWorkOrderService(e.target.value).then(res=>{
        setLaborActivityUpdate(res)
        console.log(res)
      })
      
      setWorkOrderNumber(e.target.value)
    }
    const cancleChanges = () =>{
      history.goBack();
    }
    const saveChange = () =>{
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
          LABOR_TIME: null,
          LABOR_RATE_TYPE: null,
          STATUS: "C"
      }
        console.log('saveChange', {
          start_time,
          stop_time,
            note,
            laborRate,
            startTime,
            startDate,
            workOrderNumber,
            customar
        })
        message.success({ content: 'please check data in console '});
        // putPendingLaborService(pendingLaborRecord.KEY, serviceParams).then((res)=>{
        //   history.push(`/labor-record-complete/${pendingLaborRecord.KEY}`)
        // })
    }
    const contentHtml = <>
      {workCellUpdate.length > 0 ? workCellUpdate.map((item, index)=><Option key={index} value={item.WORK_CELL_NAME} >{item.WORK_CELL_NAME}</Option>) : null}
    </>;
    const contentHtmlForEmployee = <>
      {employeeUpdate.length > 0 ? employeeUpdate.map((item, index)=><Option key={index} value={item.NAME} >{item.NAME}</Option>) : null}
    </>;

    return (
      <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={20}>
          <div>
            <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
            <UiGrid title="Work Order" >
              <Input placeholder="Enter Work Order" value={workOrderNumber} name="workOrder" onChange={onChangeWorkOrder} />
            </UiGrid>
            <UiGrid title="Customar" >
              <Input placeholder="Customar" name="customar" value={customar} onChange={onChangeCustomar} />
            </UiGrid>
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
                  {/* <Option >{workCenterName}</Option> */}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Start Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact >
                    <DatePicker onChange={onChangeStartDate}  format={dateFormat}/>
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm" onChange={onChangeStartTime}  />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Stop Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact>
                    <DatePicker onChange={onChangeStopDate}  format={dateFormat} />
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm" onChange={onChangeStopTime}  />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Labor Hours" number={pendingLaborRecord.LABOR_TIME} />
            <div >
                <p>Note *</p>
                <TextArea rows={4} name='note' value={note}  placeholder="Note"/>
            </div>
            <div className="footer-button">
                <Button 
                    type="primary" 
                    style={{backgroundColor:'red'}} 
                    className="time-button" 
                    onClick={cancleChanges} 
                > <b>Cancel <br></br> Do not save changes </b>
                </Button>
                <Button 
                    type="primary" 
                    className="time-button" 
                    onClick={saveChange} 
                    style={{padding: '27px'}} 
                > <b>Save Changes</b> 
                </Button>  
            </div>
          </div>
        </Col>

    </Row>
      </>
    )
}
export default LaborReviewAndPostingAdd