
import React from 'react'
import './ui-timer-buuton.scss'
// context
function UiTimerButton(props) {

    const { timerHandler,name,time,hours, color, border,txtColor, width, height} = props
    return (
    <React.Fragment>
       <div className="ui-timer-button" 
            style={{background:color, border:`1px solid ${border}`,color:txtColor,width:width,height:height}} 
            onClick={timerHandler}>
            <p>{name}</p>
            <p>{time}</p>
            <p>{hours}</p>
       </div>
    </React.Fragment>
    )
}
export default UiTimerButton
            