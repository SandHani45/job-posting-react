import React, { useState, useEffect, useContext } from 'react';
//components
import UiCard from './../../views/UiCard'
import UiPageHeader from './../../views/UiPageHeader'
import Spinner from './../../views/Spinner'
//Constants
import Constants from './../../constants'
// Router
import {useHistory} from 'react-router-dom';
//antd
import { Row } from 'antd';
// context
import { GlobalContext } from "./../../context/GlobalState";

const WorkCell = () => {
  const [page, setPage] = useState(1);
  const { getWorkCell, workCellData , getKeyData, getPanalShop} = useContext(GlobalContext);
  const history = useHistory();
    useEffect(() => {
      getWorkCell()
    }, [page]);

  const panelShopClick = (key) => {
    let data = workCellData
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
        {workCellData.length >= 1 ? workCellData.map((item, index)=>{
          return <UiCard key={item.KEY } text={item.DEPARTMENT_NAME} name={item.WORK_CELL_NAME} onClickHandler={() => panelShopClick(item.DEPARTMENT_KEY)}/>
        }) : <Spinner />}
      </Row>
    </>
  ); 
}

export default WorkCell;