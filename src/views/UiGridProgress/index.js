
import React from 'react'
import UiTimerButton from './../UiTimerButton'
//antd
import { Row,Col } from 'antd';
function UiGridProgress(props) {
    const { employe,worder,lactivity,start_time} = props;
    const style = {  padding: '8px 0' };
    return (
    <React.Fragment>
         <div className="ui-grid-progress" >
            <hr></hr>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={2}>
                    <div style={style}>
                        <p>Employee</p>
                        <p>Work Order</p>
                        <p>Labor Activity</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
                    <div style={style}>
                        <p>227</p>
                        <p>1803530</p>
                        <p>1811</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={10}>
                    <div style={style}>
                        <p>Jessy</p>
                        <p>SMS PROGRESS </p>
                        <p>Wring </p>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <p>Start Time</p>
                        <p>12:54 pm </p>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>
                        <UiTimerButton name="Elasped" time='30:30' hours='HoursMinutes'/>
                    </div>
                </Col>
            </Row>
        </div>
    </React.Fragment>
    )
}
export default UiGridProgress
            