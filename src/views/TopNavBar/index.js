import React, {useContext} from 'react'
import BreadcurmbList from './../BreadcurmbList';
import {
  Link
} from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import { GlobalContext } from "./../../context/GlobalState";
import './topNavBar.scss'
function TopNavBar(props) {
  const { keyData } = useContext(GlobalContext);
  let location = useLocation();
  let track = keyData.length > 0 ? `/panel-shop/${keyData[0].DEPARTMENT_KEY}` :'/'
  let tempalate
    if(location.pathname === '/labor-tracker'){
      return tempalate = (
        <div className="main-flex">
          <div>
              <BreadcurmbList />
          </div>
        </div>
      )
    }else{
      if(location.pathname === '/progress-timers'){
        return tempalate = (
          <div className="main-flex">
            <div>
                <BreadcurmbList />
            </div>
            <div>
                <a href={track}>Track Another Job in this Work Cell</a>
            </div>
          </div>
        )
      }else{
        tempalate = (
          <div className="main-flex">
            <div>
                <BreadcurmbList />
            </div>
            <div>
            <a href="/progress-timers">See All In Progress</a> 
            </div>
          </div>
        )
      }
    }
    
    
    return (
        <>
          {tempalate}
        </>
    )
}

export default TopNavBar;