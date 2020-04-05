import React from 'react'
import { Breadcrumb } from 'antd';
import './topNavBar.scss'
function TopNavBar() {
    return (
        <div className="main-flex">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div>
              <a href="/progress-timers">See All In Progress</a>
          </div>
        </div>
    )
}

export default TopNavBar;