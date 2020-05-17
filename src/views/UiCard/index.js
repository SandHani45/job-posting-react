import React from 'react'
import { Card, Col } from 'antd';
import './ui-card.scss'
const style = { background: '#bfbfbf', padding: '8px 0' };
function UiCard(props) {
  const { text, onClickHandler, name, outline} = props
  let outlineStyle
  if(outline === null){
    outlineStyle = 'outline'
  }
  return (
    <React.Fragment>
      <Col className="gutter-row mg" xs={20} sm={20} md={10} lg={8} xl={10} >
        <Card
          hoverable
          style={style}
          className={`card-body ${outlineStyle}`}
          onClick={onClickHandler}
        >
          <p >{text} </p>
          <p>{name}</p>
        </Card>
      </Col>
    </React.Fragment>
  )
}
export default UiCard
