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

 function PanelShop(props) {
    const { panelShop , getKeyData ,keyData} = useContext(GlobalContext);
    let { id } = useParams();
    const history = useHistory();
    useEffect(() => {
      console.log('1',keyData)
    }, [1]);

    function jobPosting (key) {
      let data = panelShop[0]
      let keyValue;
      data.map(item=>{
          if(item.EMPLOYEE === key){
              keyValue =  item
          }
      })
      getKeyData('panel_shop',keyValue)
      history.push(`/job-posting-employee/${key}`);
    };
  
    return (
        <>
        <UiPageHeader content={Constants.WORKCELL} />
          <Row gutter={16}>
            {panelShop.length >= 1 ? panelShop[0].map((item, index)=>{
              return <UiCard key={index } text={`#${item.EMPLOYEE}`} name={item.NAME} onClickHandler={() => jobPosting(item.EMPLOYEE)}/>
            }):  null}
          </Row>
        </>
    )
}
export default PanelShop