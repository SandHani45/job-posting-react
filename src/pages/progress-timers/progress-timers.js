import React, { useState, useEffect, useContext } from 'react';
//components
import UiPageHeader from './../../views/UiPageHeader'
import UiTimerButton from './../../views/UiTimerButton'
import UiGridProgress from './../../views/UiGridProgress'
import Spinner from './../../views/Spinner'
// Router
import {useHistory} from 'react-router-dom';
//Constants
import Constants from './../../constants'
//antd
import { Row,Col } from 'antd';
// context
import { GlobalContext } from "./../../context//GlobalState";
import _ from 'lodash';
import moment from 'moment'

const ProgressTimers = () => {
  const { getPendingLabor , pendingLabor, startTime} = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const history = useHistory();
    useEffect(() => {
      getPendingLabor()
    }, [page]);
    const timerHandler = (key) =>{
      history.push(`/progress-time-stop/${key}`)
    }
    const progressDataFilter = pendingLabor.length > 0 ? _.orderBy(pendingLabor, ['KEY'], ['desc']) : null
    let tempalte
    if(progressDataFilter){
      let data =  _.filter(progressDataFilter, function(item) { return item.STOP_TIME === null });
      console.log(data)
      tempalte = (
        data.map((item, index)=>{
          let itemStartTime = _.split(item.START_TIME, ' ');
          let time = itemStartTime[1]
          return  <UiGridProgress 
                key={index}
                employe={item.EMPLOYEE_KEY} 
                wOrder={item.WORK_ORDER_NUMBER} 
                activity="22" 
                start_time={time}
                start_time_count={item.START_TIME}
                employeName={item.EMPLOYEE_NAME}
                wcName={item.WORK_CELL_NAME}
                woDes={item.WO_DESCRIPTION == null ? 'null' : item.WO_DESCRIPTION}
                timerHandler={() => timerHandler(item.KEY)} 
            />
        })
      )
    }else{
      return <Spinner />
    }
  return (
    <>
      <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} progress={true} />
      {tempalte }
    </>
  ); 
}

export default ProgressTimers;