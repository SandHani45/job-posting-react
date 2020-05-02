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
import Spinner from './../../views/Spinner'
//Constants
import Constants from './../../constants'
//scss 
import './labor-review-and-posting.scss'
  // service
import { getProgressTimeStopService, putPendingLaborService } from './../../service/pendingLabor'
const { Option } = Select;
const format = 'HH:mm';
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

const LaborReviewAndPostingEdit = () => {
  const history = useHistory();
  const {pendingLaborRecord,panelShop, workCellData, getWorkCell, getPanalShop, getPendingLaborRecord } = useContext(GlobalContext);
  const [page, setPage] = useState([]);
  const [note, setNote] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [stopDate, setStopDate] = useState('');
  const [laborRate, setRaborRate] = useState(Constants.LABOR_RATE[0]);
  let { id } = useParams();
    useEffect(() => {
      getProgressTimeStopService(id).then(res=>{
        setPage(res[0])
        setStartTime(res[0].START_TIME)
        setStopTime(res[0].STOP_TIME)
      })
    }, [1]);

    const onChange = (e) => {
        setNote(e.target.value);
    }
    const onChangeStartTime = (time) =>{
        setStartTime(time);
    }
    const onChangeStopTime = (time) =>{
        setStopTime(time);
    }
    const onChangeStartDate = (date) =>{
        setStartDate(date);
    }
    const onChangeStopDate = (date) =>{
        setStopDate(date);
    }
    const onChangeRate = (value) =>{
        setRaborRate(value)
    }
    const cancleChanges = () =>{
      history.goBack();
    }
    const saveChange = () =>{
        let serviceParams = {
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
            LABOR_RATE_TYPE: laborRate,
            NOTE:note,
            STATUS: "C"
        }
        console.log('saveChange', {
            stopTime,
            stopDate,
            note,
            laborRate,
            startTime,
            startDate
        })
    }
    const onSubmit = (e) => {
      e.preventDefault();
      let serviceParams = {
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
      putPendingLaborService(pendingLaborRecord.KEY, serviceParams).then((res)=>{
        history.push(`/labor-record-complete/${pendingLaborRecord.KEY}`)
      })
    }

    const contentHtml = <>
      {workCellData.length > 0 ? workCellData.map((item, index)=><Option key={index} value={item.WORK_CELL_NAME} >{item.WORK_CELL_NAME}</Option>) : null}
    </>;
    const contentHtmlForEmployee = <>
      {panelShop.length > 0 ? panelShop.map((item, index)=><Option key={index} value={item.NAME} >{item.NAME}</Option>) : null}
    </>;
    const contentHtmlForRate = <>
        {Constants.LABOR_RATE.map((item, index)=><Option key={index} value={item} >{item}</Option>)}
    </>;
    
    return (
      <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <form  className="labor-record-form">
        <Col className="gutter-row" span={20}>
          <div>
            <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
            <UiGrid title="Work Order " number={page.WORK_ORDER_NUMBER} />
            <UiGrid title="Customar " number={page.CUST_NAME} />
            <UiGrid title="Work Cell " number={page.WORK_CELL_NAME} />
            <UiGrid title="Employee " number={page.EMPLOYEE_NAME} />
            {/* <UiGrid title="Labor Performed " number={pendingLaborRecord.INVENTORY_NAME} /> */}
            {/* <UiGrid title="Labor Performed" >
              <Input.Group compact>
                <Select defaultValue={pendingLaborRecord.INVENTORY_NAME} name="laborPerformed" onChange={onChangeWorkCell}>
                  {contentHtml}
                </Select>
              </Input.Group>
            </UiGrid> */}
            {/* <UiGrid title="Employee" >
              <Input.Group compact>
                <Select defaultValue={apiFetchData.employeeUpdate.length > 0 ?  '': pendingLaborRecord.EMPLOYEE_NAME}  name="employee">
                  {contentHtmlForEmployee}
                </Select>
              </Input.Group>
            </UiGrid> */}
            <UiGrid title="Labor Performed" >
              <Input.Group compact>
              <Select defaultValue={page.INVENTORY_NAME} value={page.INVENTORY_NAME} onChange={onChangeRate} name="laborPerformed">
                <Option value={page.INVENTORY_NAME} onChange={onChange}>{page.INVENTORY_NAME}</Option>
              </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Start Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact >
                    <DatePicker onChange={onChangeStartDate} defaultValue={moment(startDate, dateFormat)} format={dateFormat}/>
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChangeStartTime} value={moment(startTime, format)} />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Stop Time" >
              <div className="data-set">
                <div>
                  <Input.Group compact>
                    <DatePicker onChange={onChangeStopDate} defaultValue={moment(stopDate, dateFormat)} format={dateFormat} />
                  </Input.Group>
                </div>
                <div>
                  <TimePicker use12Hours format="h:mm:ss A" onChange={onChangeStopTime} value={moment(stopTime, format)} />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Labor Hours " number={pendingLaborRecord.LABOR_TIME} />
            <UiGrid title="Labar Rate" >
              <Input.Group compact>
                <Select defaultValue={laborRate} value={laborRate} onChange={onChangeRate} >
                  {contentHtmlForRate}
                </Select>
              </Input.Group>
            </UiGrid>
            <div >
                <p>Note *</p>
                <TextArea rows={4} name='note' value={note} onChange={onChange} placeholder="Note"/>
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
        </form>
    </Row> 
      </>
    )
}
export default LaborReviewAndPostingEdit