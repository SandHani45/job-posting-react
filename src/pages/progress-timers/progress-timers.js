import React, { useState, useEffect, useContext } from 'react';
//components
import UiPageHeader from './../../views/UiPageHeader'
import UiTimerButton from './../../views/UiTimerButton'
import UiGridProgress from './../../views/UiGridProgress'

//Constants
import Constants from './../../constants'
//antd
import { Row,Col } from 'antd';
// context
import { GlobalContext } from "./../../context//GlobalState";

function ProgressTimers() {
  const [page, setPage] = useState(1);
  const { } = useContext(GlobalContext);
  
  return (
    <>
        <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
        <UiGridProgress />
        <UiGridProgress />
        <UiGridProgress />
        <UiGridProgress />
    </>
  ); 
}

export default ProgressTimers;