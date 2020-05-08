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
import UiGrid from './../../views/UiGrid'
import UiTimerButton from './../../views/UiTimerButton'
import Spinner from './../../views/Spinner'
import { convertMonthToNumber, convertDateTime } from './../../utile/helpers' 
//Constants
import Constants from './../../constants'
//scss 
import './labor-review-and-posting.scss'
  // service
import { getProgressTimeStopService, putPendingLaborService } from './../../service/pendingLabor'
const { Option } = Select;
const format = 'HH:mm';
const { TextArea } = Input;
const dateFormat = 'DD-MM-YYYY';

const LaborReviewAndPostingEdit = () => {
  const history = useHistory();
  const {pendingLaborRecord,panelShop, workCellData, getWorkCell, getPanalShop, getPendingLaborRecord } = useContext(GlobalContext);
  const [page, setPage] = useState([]);
  const [note, setNote] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [stopDate, setStopDate] = useState('');
  const [laborPerform, setLaborPerform] = useState('');
  const [laborRate, setRaborRate] = useState(Constants.LABOR_RATE[0]);
  let { id } = useParams();
    useEffect(() => {
      getProgressTimeStopService(id).then(res=>{
        setPage(res[0])
        let start = res[0].START_TIME.split(" ");
        let stop = res[0].STOP_TIME !== null ? res[0].STOP_TIME.split(" "): ''
        console.log(convertMonthToNumber(start[0]))
        setStartTime(start[1])
        setStartDate(convertMonthToNumber(start[0]))
        setStopTime(stop[1])
        setStopDate(convertMonthToNumber(stop[0]))
        setLaborPerform(res[0].INVENTORY_NAME)
      })
    }, [1]);

    const onChange = (e) => {
      setNote(e.target.value);
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
    const onChangeLaborPerform = (value) =>{
      setLaborPerform(value)
    }
    const cancleChanges = () =>{
      history.goBack();
    }
    const saveChange = () =>{
      let start_time = convertDateTime(startDate,startTime)
      let stop_time = convertDateTime(stopDate,stopTime)
        let serviceParams = {
            PLANT_KEY: page.PLANT_KEY,
            DEPARTMENT_KEY: page.DEPARTMENT_KEY,
            EMPLOYEE_KEY: page.EMPLOYEE_KEY,
            WORK_CENTER_KEY: page.WORK_CENTER_KEY,
            WORK_CELL_KEY: page.WORK_CELL_KEY,
            LABOR_CLASS: null,
            WORK_ORDER_NUMBER: page.WORK_ORDER_NUMBER,
            START_TIME: start_time,
            STOP_TIME: stop_time,
            LABOR_TIME: null,
            LABOR_RATE_TYPE: null,
            NOTE:note,
            STATUS: "C"
        }
        console.log(laborRate, start_time, stop_time)
        putPendingLaborService(page.KEY, serviceParams).then((res)=>{
          message.success({ content: 'Successfully Updated ' });
          history.push(`/labor-review-and-posting`)
        })
    }
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
            <UiGrid title="Labor Performed" >
              <Input.Group compact>
              <Select value={laborPerform} onChange={onChangeLaborPerform} name="laborPerformed">
                <Option value={page.INVENTORY_NAME} onChange={onChange}>{page.INVENTORY_NAME}</Option>
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
                  <TimePicker use12Hours format="h:mm:ss" onChange={onChangeStartTime} value={moment(startTime, format)} />
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
                  <TimePicker use12Hours format="h:mm:ss" onChange={onChangeStopTime} value={moment(stopTime, format)} />
                </div>
              </div>
            </UiGrid>
            <UiGrid title="Labor Rate" >
              <Input.Group compact>
                <Select value={laborRate} onChange={onChangeRate} name="laborRate">
                  {contentHtmlForRate}
                </Select>
              </Input.Group>
            </UiGrid>
            <UiGrid title="Labor Hours" number={pendingLaborRecord.LABOR_TIME} />
            <div>
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