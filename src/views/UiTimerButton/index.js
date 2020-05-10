
import React, {useState,useEffect,useContext} from 'react'
import moment from 'moment'
import './ui-timer-buuton.scss'
// context
import { GlobalContext } from "./../../context/GlobalState";

function UiTimerButton(props) {
    const { timerHandler,name,time,hours, color, border,txtColor, width, height} = props;
    const [start, setStart] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [startTimer , setStartTimer] = useState(time)
    useEffect(() => {
        let interval = null;
        if (isActive) {
        interval = setInterval(() => {
            setStart(start => start + 1);
            if(startTimer !== 'null'){
                var timer = time !== undefined ? time.split(' '):"0 0"
                var endTime = moment().format('MM-DD-YYYY h:mm:ss')
                var finalTimeSub = moment(moment(endTime).diff(moment(timer[1],"hh:mm:ss"))).format("hh:mm:ss")
                setStart(start => start + 1);
                setStartTimer(finalTimeSub)
            }
        }, 1000);
        } else if (!isActive && start !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive,start]);

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
export default UiTimerButton
            