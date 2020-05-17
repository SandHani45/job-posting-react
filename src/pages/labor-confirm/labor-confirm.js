
import React, {useContext,useState,useEffect} from 'react'
//components
import UiGrid from './../../views/UiGrid'
import UiPageHeader from './../../views/UiPageHeader';
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'
import _ from 'lodash'
import BackButton from './../../views/BackButton'
import {useHistory} from 'react-router-dom';
import { Button,Row, Col } from 'antd';
//SCSS
import './labor-confirm.scss'
// service
import { postPendingLaborService } from './../../service/pendingLabor'

 const LaborActivity = (props) => {
    const { keyData , getPendingLabor,startTime,laborActivity,startTimer, laborConfirm} = useContext(GlobalContext);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();
    useEffect(() => {
        if(keyData.length  === 0){
            history.push(`/work-cell`)
          }
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            startTimer(seconds)
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);
     
    const startHandler = () => {
        // Date and Time Conveter script
        setIsActive(!isActive)
        //************************************* */
        // time convater // 
        let tempDate = new Date()
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let tempMonth = months[tempDate.getMonth()]
        let finalDate = [tempDate.getDate(), tempMonth, tempDate.getFullYear()].join('-')
        let tempTime = new Date().toLocaleString('en-GB');
        let splitTime = tempTime.split(',')
        let time = splitTime[1]
        let finaleDateTime = [finalDate,time].join(' ')
        //************************************* */
        let serviceParams = {
            PLANT_KEY: keyData[0].PLANT_KEY,
            DEPARTMENT_KEY: keyData[0].DEPARTMENT_KEY,
            EMPLOYEE_KEY: keyData[1].EMPLOYEE,
            WORK_CENTER_KEY: keyData[3].KEY,
            WORK_CELL_KEY: keyData[0].KEY,
            LABOR_CLASS: null,
            WORK_ORDER_NUMBER: parseInt(keyData[2].workOrderPosting),
            START_TIME: finaleDateTime,
            STOP_TIME: null,
            LABOR_TIME: null,
            LABOR_RATE_TYPE: null,
            STATUS: "I"
        }
        postPendingLaborService(serviceParams).then(res=>{
            history.push('/progress-timers')
        })
    }
    return (
        <>
        {laborConfirm.length > 0 ? 
            <>  
                <UiPageHeader content={Constants.LABORCONFIRM} />
                {console.log(keyData)}
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                    <div>
                        <UiGrid title={Constants.WORKORDER} number={laborConfirm[0].WO_NUMBER} desc={laborConfirm[0].WO_DESC} />
                        <UiGrid title={Constants.CUSTOMER} number={laborConfirm[0].CUSTOMER} desc={laborConfirm[0].CUSTOMER_NAME}/>
                        <UiGrid title={Constants.PLANT} number={laborConfirm[0].PLANT} desc={laborConfirm[0].PLANT_NAME} />
                        <UiGrid title={Constants.DEPARTMENT} number={keyData[0].DEPARTMENT_KEY} desc={keyData[0].DEPARTMENT_NAME} />
                        <UiGrid title={Constants.WORKCELLS} number={keyData[0].KEY} desc={keyData[0].WORK_CELL_NAME} />
                        <UiGrid title={Constants.EMPLOYEE} number={laborConfirm[0].EMPLOYEE} desc={laborConfirm[0].EMP_NAME} />
                        <UiGrid title={Constants.LOBARACTIVITY}  number={laborConfirm[0].CODE} desc={laborConfirm[0].DESCRIPTION} />
                    </div>
                    </Col>
                    
                    <Col className="gutter-row" offset={12} span={8}>
                        <div ><Button type="primary" className="start-button green" onClick={startHandler} >Start Tracking</Button> </div>
                    </Col>
                </Row>
                <BackButton />
            </> : null }
            
        </>
    )
}
export default LaborActivity