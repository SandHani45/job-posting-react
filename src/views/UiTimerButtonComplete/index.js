
import React, {useState,useEffect,useContext} from 'react'
import moment from 'moment'
import './ui-button-complete.scss'
// context
import { GlobalContext } from "./../../context/GlobalState";

function UiTimerButtonComplete(props) {
    const { timerHandler,name,time,hours, color, border,txtColor, width, height} = props;
    const [start, setStart] = useState(0);
    const [startTimer , setStartTimer] = useState(time)
    useEffect(() => {
        var timer = time !== undefined ? time.split(' '):"0 0"
        var endTime = moment().format('h:mm:ss')
        var finalTimeSub = moment(moment(endTime,"hh:mm:ss").diff(moment(timer[1],"hh:mm:ss"))).format("hh:mm:ss")
        setStart(start => start + 1);
        setStartTimer(finalTimeSub)
        console.log("------ss", finalTimeSub)
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
            