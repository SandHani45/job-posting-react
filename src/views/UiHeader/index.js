import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;

function UiHeader() {
  return (
    <React.Fragment>
      <Header>
        <div className="logo">
          <h3 className="logo-white">Logo</h3>
        </div>
      </Header>
    </React.Fragment>
  )
}
export default UiHeader
