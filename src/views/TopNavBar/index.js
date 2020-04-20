import React, {useContext} from 'react'
import { Breadcrumb } from 'antd';
import {
  Link
} from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import { GlobalContext } from "./../../context//GlobalState";
import './topNavBar.scss'
function TopNavBar() {
  const { keyData } = useContext(GlobalContext);
  let location = useLocation();
  let track = keyData.length > 0 ? `/panel-shop/${keyData[0].DEPARTMENT_KEY}` :'/'
    return (
        <div className="main-flex">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div>
            {location.pathname !== '/progress-timers' ? 
              <Link to="/progress-timers">See All In Progress</Link> 
              : <Link to={track}>Track Another Job in this Work Cell</Link> 
              }
              
          </div>
        </div>
    )
}

export default TopNavBar;