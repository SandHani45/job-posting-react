
import React from 'react'
import './ui-timer-buuton.scss'
function UiTimerButton(props) {
    const { timerHandler,name,time,hours} = props
    return (
    <React.Fragment>
       <div className="ui-timer-button" onClick={timerHandler}>
            <p>{name}</p>
            <p>{time}</p>
            <p>{hours}</p>
       </div>
    </React.Fragment>
    )
}
export default UiTimerButton
            