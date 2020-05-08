import React, {useState,useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
//Constants
import Constants from './../../constants'
// Antd
import { Row } from 'antd';
import {useHistory} from 'react-router-dom';
// context
import { GlobalContext } from "./../../context//GlobalState";

const PanelShop = () => {
    const { panelShop , getBreadcurmbList, getKeyData ,keyData} = useContext(GlobalContext);
    let { id } = useParams();
    const history = useHistory();
    useEffect(() => {
      if(keyData.length  === 0){
        history.push(`/work-cell`)
      }
    }, [1]);

    function jobPosting (key, name) {
      let data = panelShop
      let keyValue;
      data.map(item=>{
          if(item.EMPLOYEE === key){
              keyValue =  item
          }
      })
      getKeyData('panel_shop',keyValue)
      getBreadcurmbList(`/panel-shop/${id}`,name)
      history.push(`/job-posting-employee/${key}`);
    };
  
    return (
        <>
        <UiPageHeader content={Constants.PANALSHOP} />
          <Row gutter={16}>
            {panelShop.length >= 1 ? panelShop.map((item, index)=>{
              return <UiCard key={index } text={`#${item.EMPLOYEE}`} name={item.NAME} onClickHandler={() => jobPosting(item.EMPLOYEE, item.NAME)}/>
            }):  null}
          </Row>
        </>
    )
}
export default PanelShop