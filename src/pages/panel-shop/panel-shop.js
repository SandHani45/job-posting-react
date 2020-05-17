import React, {useState,useEffect, useContext} from 'react'
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
//Constants
import Constants from './../../constants'
// Antd
import { Row } from 'antd';
import {useHistory, useParams} from 'react-router-dom';
// context
import { GlobalContext } from "./../../context//GlobalState";
import BackButton from './../../views/BackButton'
const PanelShop = () => {
    const { panelShop , getBreadcurmbList, getKeyData ,keyData, breadcurmbList, breadcurmbAction} = useContext(GlobalContext);
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
      // const backButtonAction = (item) =>{
      //   breadcurmbAction(`/panel-shop/${id}`, item.name)
      // }
    return (
        <>
        <UiPageHeader content={Constants.PANALSHOP} />
          <Row gutter={16}>
            {panelShop.length >= 1 ? panelShop.map((item, index)=>{
              return <UiCard key={index } text={`#${item.EMPLOYEE}`} name={item.NAME} onClickHandler={() => jobPosting(item.EMPLOYEE, item.NAME)}/>
            }):  null}
          </Row>
          <BackButton />
        </>
    )
}
export default PanelShop