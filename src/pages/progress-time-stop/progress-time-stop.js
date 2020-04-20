
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

// service
import { putPendingLaborService } from './../../service/pendingLabor'

 const  ProgressTimeStop = (props) => {
    const {pendingLabor, pendingLaborRecord, getPendingLaborRecord } = useContext(GlobalContext);
    let { id } = useParams();
    const [page, setPage] = useState(0);
    const history = useHistory();
    let tempDate = new Date()
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let tempMonth = months[tempDate.getMonth()]
    let finalDate = [tempDate.getDate(), tempMonth, tempDate.getFullYear()].join('-')
    let tempTime = new Date().toLocaleString('en-GB');
    let splitTime = tempTime.split(',')
    let time = splitTime[1]
    let finaleDate = [time].join(' ')

    useEffect(() => {
        getPendingLaborRecord(id)
      }, [page]);

 
    const stopTimer = () =>{
        let serviceParams = {
            STOP_TIME: finaleDate,
        }
        putPendingLaborService(id, serviceParams).then((res)=>{
            console.log(res)
        })
        history.push('/review-timer')
    }

    return (
        <>
            { pendingLaborRecord !== undefined ?
                <> 
                    <UiPageHeader content={Constants.LABORCONFIRM} />
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                        <div>
                            <UiGrid title={Constants.WORKORDER} number={pendingLaborRecord.WORK_ORDER_NUMBER} desc={pendingLaborRecord.WO_DESCRIPTION} />
                            <UiGrid title={Constants.CUSTOMER} number={pendingLaborRecord.CUST_NAME} />
                            <UiGrid title={Constants.PLANT} number={pendingLaborRecord.INVENTORY_NUMBER} desc={pendingLaborRecord.INVENTORY_NAME} />
                            <UiGrid title={Constants.DEPARTMENT} number={pendingLaborRecord.DEPT_CODE} desc={pendingLaborRecord.DEPT_NAME} />
                            <UiGrid title={Constants.WORKCELLS} number={pendingLaborRecord.WORK_CELL_KEY} desc={pendingLaborRecord.WORK_CELL_NAME} />
                            <UiGrid title={Constants.EMPLOYEE} number={pendingLaborRecord.EMPLOYEE_KEY} desc={pendingLaborRecord.EMPLOYEE_NAME} />
                            <UiGrid title={Constants.LOBARACTIVITY}  number={pendingLaborRecord.WORKCENTER_NAME} />
                        </div>
                        </Col>
                        <Col className="gutter-row" offset={8} span={5}>
                            <div>
                            <UiTimerButton name="Elasped" time='100' hours='HoursMinutes' color="green" />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <div>
                                <UiTimerButton name="Stop Timer" time='and' hours='Review Labor' color="red" timerHandler={stopTimer}/>
                            </div>
                        </Col>
                    </Row>
                 </> 
                : null}
           
        </>
    )
}
export default ProgressTimeStop