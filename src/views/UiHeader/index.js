import React from 'react'
import { Layout } from 'antd';
import MainHamber from './../MainHamber'
import { Link } from 'react-router-dom';
const { Header } = Layout;

const UiHeader = (props) => {
  return (
    <React.Fragment>
      <Header>
        <div className="logo">
          {
            props.for === 'supervisor' 
              ? <div className="supervisor"><MainHamber /> <Link to="/work-cell" className="logo-white">Logo </Link> <h4 className="logo-white"> Labor Time Tracker</h4> </div>
              : <div className="labor"><Link to="/work-cell" className="logo-white">Logo </Link> <h4 className="logo-white"> Labor Time Tracker</h4> </div>
          }
          
        </div>
      </Header>
    </React.Fragment>
  )
}
export default UiHeader
