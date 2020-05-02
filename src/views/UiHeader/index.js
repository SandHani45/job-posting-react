import React from 'react'
import { Layout } from 'antd';
import MainHamber from './../MainHamber'
const { Header } = Layout;

const UiHeader = (props) => {
  return (
    <React.Fragment>
      <Header>
        <div className="logo">
          {
            props.for === 'supervisor' 
              ? <div className="supervisor"><MainHamber />  <h3 className="logo-white">Logo</h3></div>
              : <h3 className="logo-white">Logo</h3>
          }
          
        </div>
      </Header>
    </React.Fragment>
  )
}
export default UiHeader
