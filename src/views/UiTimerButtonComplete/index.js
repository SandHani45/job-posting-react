
import React, {useState,useEffect,useContext} from 'react'
import moment from 'moment'
import './ui-button-complete.scss'
// Helper
import {convertMS} from './../../utile/helpers'
function UiTimerButtonComplete(props) {
    const { timerHandler,name,time,hours, color, border,txtColor, width, height} = props;
    const [start, setStart] = useState(0);
    const [startTimer , setStartTimer] = useState(time)
    useEffect(() => {
        var today = new Date();
        var timer = time !== undefined ? time.split(' '):"0 0"
        var endTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var endTime = moment().format('h:mm:ss')
        var startSec = moment.duration(timer[1])
        var stopSec = moment.duration(endTime)
        var seconds = stopSec._milliseconds-startSec._milliseconds
        var convt = convertMS(seconds)
        var formatConvt = convt.hour + ":" + convt.minute + ":" + convt.seconds
        console.log(formatConvt)
        setStart(start => start + 1);
        setStartTimer(formatConvt)
    }, [1]);

    return (
    <React.Fragment>
       <div className="ui-timer-button" 
            style={{background:color, border:`1px solid ${border}`,color:txtColor,width:width,height:height}} 
            onClick={timerHandler}>
            <p>{name}</p>
            <p>{startTimer !== 'null' ? startTimer : 'and' }</p>
            <p>{hours}</p>
       </div>
    </React.Fragment>
    )
}
export default UiTimerButtonComplete
            