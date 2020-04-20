import React, { useState, useEffect, useContext } from 'react';
//components
import UiPageHeader from './../../views/UiPageHeader'
import UiTimerButton from './../../views/UiTimerButton'
import UiGridProgress from './../../views/UiGridProgress'
// Router
import {useHistory} from 'react-router-dom';
//Constants
import Constants from './../../constants'
//antd
import { Row,Col } from 'antd';
// context
import { GlobalContext } from "./../../context//GlobalState";

function ProgressTimers() {
  const { getPendingLabor , pendingLabor, startTime} = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const history = useHistory();
    useEffect(() => {
      getPendingLabor()
    }, [page]);
    const timerHandler = (key) =>{
      history.push(`/progress-time-stop/${key}`)
    }
  return (
    <>
        <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
        {pendingLabor.length > 0 ? pendingLabor.map((item, index)=>{
          return  <UiGridProgress 
                    key={index} 
                    employe={item.EMPLOYEE_KEY} 
                    wOrder={item.WORK_ORDER_NUMBER} 
                    lactivity="22" 
                    start_time="12:30" 
                    start_time_count={startTime}
                    employeName={item.EMPLOYEE_NAME}
                    wcName={item.WORK_CELL_NAME}
                    woDes={item.WO_DESCRIPTION}
                    timerHandler={() => timerHandler(item.KEY)} 
                  />
        }) : null}
      
    </>
  ); 
}

export default ProgressTimers;