import axios from 'axios';
const endPoint = "http://34.206.72.199:3010/api/pc"
export const getWorkCellService = () => {
    return axios.get(`${endPoint}/workCells/`).then((res) => res.data);
};
export const getWorkCellIdService = (id) => {
    return axios.get(`${endPoint}/workCells/${id}`).then((res) => res.data);
};
export const getPanelShopService = (id) => {
    return axios.get(`${endPoint}/employee/${id}`).then((res) => res.data);
};
export const getWorkOrderService = (id) => {
    return axios.get(`${endPoint}/checkWorkOrder/${id}`).then((res) => res.data);
};
export const getLaborActivityService = (key,id) => {
    return axios.get(`${endPoint}/laborActivity/${key}/${id}`).then((res) => res.data);
};
// export const getLaborConfirmService = ({deptKey, woNo, plantKey, wcellKey, wcenterKey, employee}) => {
//     return axios.get(`${endPoint}/laborConfirm/${deptKey}/${woNo}/${plantKey}/${wcellKey}/${wcenterKey}/${employee}`).then((res) => res.data);
// };
// demo 
export const getLaborConfirmService = ({deptKey, woNo, plantKey, wcellKey, wcenterKey, employee}) => {
    return axios.get(`${endPoint}/laborConfirm/31/3443151/97/2/157/55`).then((res) => res.data);
};
