
import React, {useContext} from 'react'
//components
import UiGrid from './../../views/UiGrid'
import UiPageHeader from './../../views/UiPageHeader'
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'

import {useHistory} from 'react-router-dom';
import { Button } from 'antd';
//SCSS
import './labor-confirm.scss'

 function LaborActivity(props) {
    const { keyData , laborConfirm} = useContext(GlobalContext);
    const history = useHistory();
    const startHandler = () =>{
        console.log('start')
    }
    return (
        <>
        {laborConfirm.length > 0 ? 
            <>  
                <UiPageHeader content={Constants.LABORCONFIRM} />
                {console.log(laborConfirm)}
                <div>
                    <UiGrid title={Constants.WORKORDER} number={laborConfirm[0].WO_NUMBER} desc={laborConfirm[0].WO_DESC} />
                    <UiGrid title={Constants.CUSTOMER} number={laborConfirm[0].CUSTOMER} desc={laborConfirm[0].CUSTOMER_NAME}/>
                    <UiGrid title={Constants.PLANT} number={laborConfirm[0].PLANT} desc={laborConfirm[0].PLANT_NAME} />
                    <UiGrid title={Constants.DEPARTMENT} number='' desc="" />
                    <UiGrid title={Constants.WORKCELLS} number='' desc={laborConfirm[0].NAME} />
                    <UiGrid title={Constants.EMPLOYEE} number={laborConfirm[0].EMPLOYEE} desc={laborConfirm[0].EMP_NAME} />
                    <UiGrid title={Constants.LOBARACTIVITY}  number={laborConfirm[0].CODE} desc={laborConfirm[0].DESCRIPTION} />
                </div>
              
                <div>
                    <Button type="primary" className="start-button" onClick={startHandler} >Start</Button>  
                </div>
            </> : null }
            
        </>
    )
}
export default LaborActivity