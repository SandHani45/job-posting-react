
import React, {useContext,useState, useEffect} from 'react'
//components
import UiGrid from './../../views/UiGrid'
import UiPageHeader from './../../views/UiPageHeader';
import UiTimerButton from './../../views/UiTimerButton'
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'
import _ from 'lodash'
import {useHistory,useParams} from 'react-router-dom';
import { Button,Row, Col } from 'antd';
import moment from 'moment'
import {convertMS} from './../../utile/helpers'
// service
import { putPendingLaborService } from './../../service/pendingLabor'

 const ProgressTimeStop = (props) => {
    const { pendingLaborRecord, getPendingLaborRecord } = useContext(GlobalContext);
    let { id } = useParams();
    const [page, setPage] = useState(1);
    const history = useHistory();
    useEffect(() => {
        getPendingLaborRecord(id)
      }, [page]);

 
    const stopTimer = () =>{
        let tempDate = new Date()
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let tempMonth = months[tempDate.getMonth()]
        let finalDate = [tempDate.getDate(), tempMonth, tempDate.getFullYear()].join('-')
        let tempTime = new Date().toLocaleString('en-GB');
        let splitTime = tempTime.split(',')
        let time = splitTime[1]
        let stopTime = [finalDate, time].join(' ')
        //**********convater  */
        var timer = pendingLaborRecord.START_TIME !== undefined ? pendingLaborRecord.START_TIME.split(' '):"0 0"
        var endTime = tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
        // var endTime = moment().format('h:mm:ss')
        var startSec = moment.duration(timer[1])
        var stopSec = moment.duration(endTime)
        var seconds = stopSec._milliseconds-startSec._milliseconds
        var convt = convertMS(seconds)
        var formatConvt = convt.hour + ":" + convt.minute + ":" + convt.seconds
        // ********************//
        let serviceParams = {
            PLANT_KEY: pendingLaborRecord.PLANT_KEY,
            DEPARTMENT_KEY: pendingLaborRecord.DEPARTMENT_KEY,
            EMPLOYEE_KEY: pendingLaborRecord.EMPLOYEE_KEY,
            WORK_CENTER_KEY: pendingLaborRecord.WORK_CENTER_KEY,
            WORK_CELL_KEY: pendingLaborRecord.WORK_CELL_KEY,
            LABOR_CLASS: null,
            WORK_ORDER_NUMBER: pendingLaborRecord.WORK_ORDER_NUMBER,
            START_TIME: pendingLaborRecord.START_TIME,
            STOP_TIME: stopTime,
            LABOR_TIME: formatConvt,
            LABOR_RATE_TYPE: null,
            STATUS: "I"
        }
        console.log(serviceParams)
        putPendingLaborService(id, serviceParams).then((res)=>{
            if(res){
                history.push('/review-timer')
            }
        })
    }

    return (
        <>
            { pendingLaborRecord !== undefined ?
                <> 
                    <UiPageHeader content={Constants.PROGRESS_TIME} />
                    <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                        <div>
                            {console.log(pendingLaborRecord.START_TIME)}
                            <UiGrid title={Constants.WORKORDER} number={pendingLaborRecord.WORK_ORDER_NUMBER} desc={pendingLaborRecord.WO_DESCRIPTION} />
                            <UiGrid title={Constants.CUSTOMER} number={pendingLaborRecord.CUST_NAME} />
                            <UiGrid title={Constants.PLANT} number={pendingLaborRecord.INVENTORY_NUMBER} desc={pendingLaborRecord.INVENTORY_NAME} />
                            <UiGrid title={Constants.DEPARTMENT} number={pendingLaborRecord.DEPT_CODE} desc={pendingLaborRecord.DEPT_NAME} />
                            <UiGrid title={Constants.WORKCELLS} number={pendingLaborRecord.WORK_CELL_KEY} desc={pendingLaborRecord.WORK_CELL_NAME} />
                            <UiGrid title={Constants.EMPLOYEE} number={pendingLaborRecord.EMPLOYEE_KEY} desc={pendingLaborRecord.EMPLOYEE_NAME} />
                            <UiGrid title={Constants.LOBARACTIVITY}  number={pendingLaborRecord.WORKCENTER_NAME} />
                        </div>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
                        <Col className="gutter-row" offset={8} span={5}>
                            <div>
                            <UiTimerButton name="Elasped" time={pendingLaborRecord.START_TIME} hours='HoursMinutes' color="green" />
                            </div>
                        </Col>
                        <Col className="gutter-row" offset={3} span={5}>
                            <div>
                                <UiTimerButton name="Stop Timer" time='null' hours='Review Labor' color="red" timerHandler={stopTimer}/>
                            </div>
                        </Col>
                    </Row>
                 </> 
                : null}
           
        </>
    )
}
export default ProgressTimeStop