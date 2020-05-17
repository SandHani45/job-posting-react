
import React from 'react'
import UiTimerButton from './../UiTimerButton'
//antd
import { Row,Col } from 'antd';
import './ui-grid-progress.scss'
function UiGridProgress(props) {
    const { employe,wOrder,activity,start_time,start_time_count, employeName,wcName,woDes, timerHandler} = props;
    const style = {  padding: '8px 0' };
    const styles = {
        bold:{
            fontWeight:'bold'
        },
        colorGreen:{
            color:'green',
            // padding: '8px 0',
            fontWeight: '500'
        }
    }
    return (
    <React.Fragment>
         <div className="ui-grid-progress" >
            <hr></hr>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="ui-grid-flex" style={styles.bold}>
                <Col className="gutter-row" span={4}>
                    <div style={style} className="ui-grid-progress__grid">
                        <p>Employee</p>
                        <p>Work Order</p>
                        <p>Labor Activity</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div style={styles.bold} className="ui-grid-progress__grid">
                        <p>{employe}</p>
                        <p>{wOrder}</p>
                        <p>{activity}</p>
                    </div>
                </Col>
                <Col className="gutter-row" span={7}>
                    <div style={style} className="ui-grid-progress__grid">
                        <p style={styles.bold}>{employeName}</p>
                        <p style={styles.bold}>{woDes} </p>
                        <p style={styles.bold}>{wcName} </p>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div className="ui-grid-progress__grid">
                        <p style={styles.colorGreen}>Start Time</p>
                        <p style={styles.bold}>{start_time}</p>
                    </div>
                </Col>
                <Col className="gutter-row end" span={6}>
                    <div style={style} className="ui-grid-progress__grid">
                        <UiTimerButton name="Elasped" time={start_time_count} hours='HoursMinutes' color="green" timerHandler={timerHandler}/>
                    </div>
                </Col>
            </Row>
        </div>
    </React.Fragment>
    )
}
export default UiGridProgress
            