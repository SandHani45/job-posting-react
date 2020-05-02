import axios from 'axios';
import _ from 'lodash'
const endPoint = "http://34.206.72.199:3010/api/pc"
// Pending Labor
//get
export const getPendingLaborService = () => {
    return axios.get(`${endPoint}/pendingLabor`).then((res) => res.data);
}
//get:id
export const getProgressTimeStopService = (key) => {
    return axios.get(`${endPoint}/pendingLabor/${key}`).then((res) => res.data);
}
//post
export const postPendingLaborService = (body) => {
    return axios.post(`${endPoint}/pendingLabor`, body).then((res) => res.data);
}

// put
export const putPendingLaborService = (key, body) => {
    return axios.put(`${endPoint}/pendingLabor/${key}`, body).then((res) => res.data);
}

// Delete
export const deletePendingLaborService = (key) => {
    return axios.delete(`${endPoint}/pendingLabor/${key}`).then((res) => res.data);
}

// getLaborPostingFilter
export const getLaborPostingFilterService = (wOrder) => {
    let filterData = {
        wOrder:wOrder
    }
    return axios.get(`${endPoint}/pendingLabor/${' '}/${' '}/${filterData.wOrder}`).then((res) => {
        return _.filter(res.data, function(item) { 
            if(item.STATUS === "I"){
                return item
            }
         });
    });
}

// listLaborAuditTrail
export const getListLaborAuditTrail = (id) => {
    return axios.get(`${endPoint}/listLaborAuditTrail/${id}`).then((res) => res.data);
}