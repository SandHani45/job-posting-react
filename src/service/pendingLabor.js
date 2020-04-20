import axios from 'axios';
const endPoint = "http://34.206.72.199:3001/api/pc"
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
export const deletePendingLaborService = (key, body) => {
    return axios.delete(`${endPoint}/pendingLabor/${key}`, body).then((res) => res.data);
}
