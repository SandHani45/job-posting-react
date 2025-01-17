import React, {useContext} from 'react'
import BreadcurmbList from './../BreadcurmbList';
import {
  Link
} from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import {  useLocation } from 'react-router-dom';
import { GlobalContext } from "./../../context/GlobalState";
import './topNavBar.scss'
function TopNavBar(props) {
  const { keyData } = useContext(GlobalContext);
  let location = useLocation();
  let track = keyData.length > 0 ? `/panel-shop/${keyData[0].DEPARTMENT_KEY}` :'/'
  let tempalate
    if(location.pathname.includes('/labor-tracker')){
      return tempalate = (
        <div className="main-flex">
          <div>
              {/* <BreadcurmbList /> */}
          </div>
        </div>
      )
    }else{
      if(location.pathname.includes('/progress-timers')){
        return tempalate = (
          <div className="main-flex">
            <div>
                {/* <BreadcurmbList /> */}
            </div>
            <div className="icon-link">
              <span><PlusCircleOutlined /></span> <Link to={track}>Track Another Job in this Work Cell</Link>
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
            <Link to="/progress-timers">See All In Progress Timers</Link> 
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