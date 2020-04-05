import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { 
    getWorkCellService, 
    getPanelShopService, 
    getWorkOrderService,
    getLaborActivityService,
    getLaborConfirmService 
} from './../service/employee'
const initialState = {
  workCellData:[],
  panelShop:[],
  jobPosting:[],
  keyData:[],
  laborActivity: [],
  laborConfirm: {}
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function getWorkCell() {
    getWorkCellService().then((res)=>{
        dispatch({
            type: "GET_WORK_CELL",
            payload: res
        });
    })
  }

  function getPanalShop(key) {
    getPanelShopService(key).then((res)=>{
        dispatch({
            type: "GET_PANEL_SHOP",
            payload: res
        });
    })
  }

  function getWorkOrder(id) {
    let key = state.keyData[0].DEPARTMENT_KEY
    getWorkOrderService(id).then((res)=>{
        if(res[0].STATUS_MESSAGE === null){
            getLaborActivityService(key,id).then((res)=>{
                dispatch({
                    type: "GET_WORK_ORDER",
                    payload: res
                });
            })
        }else{

       }

    })
  }

  function getLaborConfirm(serviceParams) {
    getLaborConfirmService(serviceParams).then((res)=>{
        dispatch({
          type: "GET_LABOR_CONFIRM",
          payload: res
      });
    })
  }
  function getKeyData(keyName, keyValue) {
    if(keyName === 'workcell'){
      keyEmpty()
      dispatch({
        type: "GET_KEY_DATA",
        payload: keyValue
      });
    };
    if(keyName === 'panel_shop'){
      let data = state.keyData
      data.splice(1, data.length-1);
      dispatch({
        type: "GET_KEY_DATA",
        payload: keyValue
      });
    }
    if(keyName === 'post_labor'){
      let data = state.keyData
      data.splice(2, data.length-1);
      dispatch({
        type: "GET_KEY_DATA",
        payload: keyValue
      });
    }

  }
  function keyEmpty() {
    dispatch({
        type: "GET_KEY_DATA_EMPTY",
        payload: []
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        workCellData: state.workCellData,
        panelShop: state.panelShop,
        keyData: state.keyData,
        laborActivity: state.laborActivity,
        laborConfirm:state.laborConfirm,
        getWorkCell,
        getPanalShop,
        getKeyData,
        getWorkOrder,
        getLaborConfirm,
        keyEmpty
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};