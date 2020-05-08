
import React, {useContext, useEffect} from 'react'
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'
// Antd
import {useHistory, useParams} from 'react-router-dom';
import { Row } from 'antd';


 const LaborActivity = (props) => {
    const { keyData, laborActivity,getBreadcurmbList, getKeyData, getLaborConfirm} = useContext(GlobalContext);
    const history = useHistory();
    let { id } = useParams();
    useEffect(() => {
      if(keyData.length  === 0){
          history.push(`/work-cell`)
        }
    }, [1]);

    const laborActivityClick = (code, name) => {
      let data = laborActivity
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
      getLaborConfirm(serviceParams);
      getKeyData('work_center', keyValue)
      getBreadcurmbList(`/labor-activity/${id}`,`${code} ${name}`)  
      history.push(`/labor-confirm`);
    };

    return (
        <>
        <UiPageHeader content={Constants.LABOR_ACTIVITY} />
          <Row gutter={16}>
            {laborActivity.length > 0 ? laborActivity.map((item, index)=>{
              return <UiCard 
                        key={index }  
                        text={`#${item.CODE}`} 
                        name={item.DESCRIPTION} 
                        onClickHandler={() => laborActivityClick(item.CODE, item.DESCRIPTION)}
                      />
            }): 'No Data'}
          </Row>
        </>
    )
}
export default LaborActivity