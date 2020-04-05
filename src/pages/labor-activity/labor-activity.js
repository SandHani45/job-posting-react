
import React, {useContext} from 'react'
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'
// Antd
import {useHistory} from 'react-router-dom';
import { Row } from 'antd';


 function LaborActivity(props) {
    const { keyData, laborActivity, getKeyData, getLaborConfirm} = useContext(GlobalContext);
    const history = useHistory();

    const laborActivityClick = (code) => {
      let data = laborActivity[0]
      let keyValue;
      data.map(item=>{
          if(item.CODE === code){
              keyValue =  item
          }
      })
      let serviceParams = {
        deptKey : keyData[0].DEPARTMENT_KEY,
        woNo:keyData[2].workOrderPosting,
        plantKey:keyData[0].PLANT_KEY,
        wcellKey:keyData[0].KEY,
        wcenterKey:keyValue.KEY,
        employee:keyValue.CODE
      }
      getLaborConfirm(serviceParams)  
      history.push(`/labor-confirm`);
    };

    return (
        <>
        <UiPageHeader content={Constants.WORKCELL} />
          <Row gutter={16}>
            {laborActivity.length >= 1 ? laborActivity[0].map((item, index)=>{
              return <UiCard key={index }  text={`#${item.CODE}`} name={item.DESCRIPTION} onClickHandler={() => laborActivityClick(item.CODE)}/>
            }):  null}
          </Row>
        </>
    )
}
export default LaborActivity