import React, { useState, useEffect, useContext } from 'react';
//components
import UiGridProgress from './../../views/UiGridProgress'
import Spinner from './../../views/Spinner'
// Router
import {useHistory} from 'react-router-dom';
//antd
import { Input, Button, Select, Table ,Menu, Dropdown, message } from 'antd';
// context
import { GlobalContext } from "./../../context//GlobalState";
import _ from 'lodash';
import moment from 'moment'
import './labor-tracker.scss'

const LaborTracker = () => {
  const { getPendingLabor , pendingLabor, startTime} = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [workCellValue, setWorkCellValue] = useState("All");
  const { Option } = Select;
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
                woDes={item.WO_DESCRIPTION}
                timerHandler={() => timerHandler(item.KEY)} 
            />
        })
      )
    }else{
      return <Spinner />
    }

  return (
    <>
        <div className="labor-tracker">
            <div className="__work-order">
                <div className="__mr-2">
                    <p>Work Cell</p>
                </div>
                <div>
                <Input.Group compact>
                    <Select value={workCellValue}  name="workCell">
                        <Option value="All" >{"All"}</Option>
                    </Select>
                </Input.Group>
                </div>
            </div>
            <div style={{marginRight: "25px",textAlign:"center"}}>
                <p >Click a timer to access <br></br> the job </p>
            </div>
        </div>
        {tempalte}
      
    </>
  ); 
}

export default LaborTracker;