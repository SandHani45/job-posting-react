import React, { useState, useEffect, useContext } from 'react';
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
//Constants
import Constants from './../../constants'
// Router
import {useHistory} from 'react-router-dom';
//antd
import { Row } from 'antd';
// context
import { GlobalContext } from "./../../context//GlobalState";

function WorkCell() {
  const [page, setPage] = useState(1);
  const { getWorkCell, workCellData , getKeyData, keyData, getPanalShop ,keyEmpty} = useContext(GlobalContext);
  const history = useHistory();
    useEffect(() => {
      getWorkCell()
    }, [page]);

  const panelShopClick = (key) => {
    let data = workCellData[0]
    let keyValue;
    data.map(item=>{
        if(item.DEPARTMENT_KEY === key){
            keyValue =  item
        }
    })
    getPanalShop(key)
    getKeyData('workcell', keyValue)
    history.push(`/panel-shop/${key}`);
  };

  return (
    <>
      <UiPageHeader content={Constants.WORKCELL} />
      <Row gutter={16}>
        {workCellData.length >= 1 ? workCellData[0].map((item, index)=>{
          return <UiCard key={item.KEY } text={item.DEPARTMENT_NAME} onClickHandler={() => panelShopClick(item.DEPARTMENT_KEY)}/>
        }) : null}
      </Row>
    </>
  ); 
}

export default WorkCell;