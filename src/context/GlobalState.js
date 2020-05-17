import React, { createContext, useReducer } from "react";
import _ from 'lodash'
import AppReducer from "./AppReducer";
import { 
    getWorkCellService, 
    getPanelShopService, 
    getWorkOrderService,
    getLaborActivityService,
    getLaborConfirmService 
} from './../service/employee'
import {getPendingLaborService ,getLaborPostingFilterService} from './../service/pendingLabor'
const initialState = {
  workCellData:[],
  panelShop:[],
  jobPosting:[],
  keyData:[],
  laborActivity: [],
  laborConfirm: {},
  pendingLabor:{},
  startTime:0,
  endTime:null,
  isActive:false,
  pendingLaborRecord:{},
  laborPostingFilter:{},
  error:{},
  breadcurmbList:[]
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getWorkCell = () => {
    getWorkCellService().then((res)=>{
        dispatch({
            type: "GET_WORK_CELL",
            payload: res
        });
    })
  }

  const getPanalShop = (key) => {
    getPanelShopService(key).then((res)=>{
        dispatch({
            type: "GET_PANEL_SHOP",
            payload: res
        });
    })
  }

  const getWorkOrder = (id) => {
    return new Promise((resolve, reject) => {
      let key = state.keyData[0].DEPARTMENT_KEY
      getWorkOrderService(id).then((res)=>{
        if(res.length > 0){
          if(res[0].STATUS_MESSAGE === null){
            getLaborActivityService(key,id).then((res)=>{
                resolve(res)
                dispatch({
                    type: "GET_WORK_ORDER",
                    payload: res
                });
            }).catch(error=> reject(error))
          }
        }else{
          let error = {
            status:'no data',
            message:'Please enter valid Work order No Data Found '
          }
          reject(error)
          dispatch({
            type: "ERROR",
            payload: error
          });
         }
      }).catch(error=> reject(error))
    }) 
  }

  const getLaborConfirm = (serviceParams) => {
    getLaborConfirmService(serviceParams).then((res)=>{
        dispatch({
          type: "GET_LABOR_CONFIRM",
          payload: res
      });
    })
  }

  const getProgressTimeStop = (key) => {
    getProgressTimeStop(key).then((res)=>{
        dispatch({
          type: "GET_PROGRESS_TIME_STOP",
          payload: res
      });
    })
  }
  
  const getKeyData = (keyName, keyValue) => {
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
    if(keyName === 'work_center'){
      let data = state.keyData
      data.splice(3, data.length-1);
      dispatch({
        type: "GET_KEY_DATA",
        payload: keyValue
      });
    }
  }

  const keyEmpty = () =>{
    dispatch({
        type: "GET_KEY_DATA_EMPTY",
        payload: []
    });
  }

  const getPendingLabor = () => {
    getPendingLaborService().then((res)=>{
      dispatch({
        type: "GET_PENDING_LABOR",
        payload: res
      });
    })
  }

  const startTimer = (count) => {
    dispatch({
      type: "GET_START_TIME",
      payload: count
    });
  }

  const isActiveFun = (value) => {
    dispatch({
      type: "GET_IS_ACTIVE",
      payload: value
    });
  }
// laborPending
  const getPendingLaborRecord = (id) => {
    getPendingLaborService(id).then((res)=>{
      let pendingLaborKeyData = _.find(res, function(o) { 
        if(o.KEY == id){
            return o
        }
      });
      dispatch({
        type: "GET_PENDING_LABOR_RECORD",
        payload: pendingLaborKeyData
      });
    })
  }
// labor review posting 
  const getLaborPostingFilter = (wOrder) => {
    getLaborPostingFilterService(wOrder).then((res)=>{
      dispatch({
        type: "GET_LABOR_POSTING_FILTER",
        payload: res
      });
    })
  }
  const getBreadcurmbList = (path,name) =>{
     let filterValue =  _.uniqBy(state.breadcurmbList, function (e) {
        return e.name;
      });
    if(filterValue){
      const res = {
        path:path,
        name:name
      }
      dispatch({
        type: "GET_BREADCURMB",
        payload: res
      });
    }
  }

  const breadcurmbAction = (path,name) =>{
    let indexVal = state.breadcurmbList.findIndex(itemValue=>{
        if(itemValue.name === name){
            return itemValue
        }
    })
    state.breadcurmbList.splice(indexVal,state.breadcurmbList.length)
  }
  return (
    <GlobalContext.Provider
      value={{
        workCellData: state.workCellData,
        panelShop: state.panelShop,
        keyData: state.keyData,
        laborActivity: state.laborActivity,
        laborConfirm:state.laborConfirm,
        pendingLabor:state.pendingLabor,
        startTime:state.startTime,
        endTime:state.endTime,
        isActive:state.isActive,
        pendingLaborRecord:state.pendingLaborRecord,
        laborPostingFilter:state.laborPostingFilter,
        error:state.error,
        breadcurmbList:state.breadcurmbList,
        getWorkCell,
        getPendingLabor,
        getPanalShop,
        getKeyData,
        getWorkOrder,
        getLaborConfirm,
        keyEmpty,
        startTimer,
        isActiveFun,
        getPendingLaborRecord,
        getLaborPostingFilter,
        getBreadcurmbList,
        breadcurmbAction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};