import React, {useState,useEffect,useContext} from 'react'
// context
import { GlobalContext } from "./../../context/GlobalState";
const Timer = (props) => {
    const { isActive, isActiveFun, startTime, startTimer } = useContext(GlobalContext);
    const [start, setStart] = useState(0);
    useEffect(() => {
        let interval = null;
        if (isActive) {
        interval = setInterval(() => {
            setStart(start => start + 1);
            startTimer(start)
        }, 1000);
        } else if (!isActive && start !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, start]);

    const startTimers = () =>{
        isActiveFun(!isActive)
        
    }
    const stopTimer = () =>{
        isActiveFun(!isActive)
    }
    return (
        <div>
            <p> start Time: {startTime} </p>
            <p>End time :{} </p>
            <button onClick={startTimers}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    )
}
export default Timer