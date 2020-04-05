import React from 'react'
import { Card, Col } from 'antd';
import './ui-card.scss'
const style = { background: '#bfbfbf', padding: '8px 0' };
function UiCard(props) {
  const { text, onClickHandler, name} = props
  return (
    <React.Fragment>
      <Col className="gutter-row" span={6}>
        <Card
          hoverable
          style={style}
          className="card-body" 
          onClick={onClickHandler}
        >
          <p  >{text}   </p>
          <p>{name}</p>
        </Card>
      </Col>
    </React.Fragment>
  )
}
export default UiCard
