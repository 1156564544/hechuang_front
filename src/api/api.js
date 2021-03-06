import axios from 'axios';

let base = 'http://124.71.13.39:9000';

// let base = '/api';

export const requestLogin = params => { return axios.post(`${base}/userlogin`, params).then(res => res.data); };

// user

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.post(`${base}/user/listpage`, params).then(res => res); };

export const removeUser = params => { return axios.post(`${base}/user/remove`, params); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.post(`${base}/user/edit`, params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/user/add`, params); };

// device

export const getDeviceListPage = params => { return axios.post(`${base}/device/listpage`, params).then(res => res); };

export const editDevice = params => { return axios.post(`${base}/device/edit`, params).then(res => res.data); };

export const addDevice = params => { return axios.post(`${base}/device/add`, params); };

export const removeDevice = params => { return axios.post(`${base}/device/remove`, params); };

export const trafficControl = params => { return axios.post(`${base}/traffic/control`, params).then(res => res.data); };

export const downloadControl = params => { return axios.post(`${base}/download/control`, params).then(res => res.data); };

// log

export const getLogListPage = params => { return axios.post(`${base}/log/listpage`, params).then(res => res); };

export const getPicture = params => { return axios.post(`${base}/log/picture`, params).then(res => res); };

export const getMCU = params => { return axios.post(`${base}/log/MCU`, params).then(res => res); };

export const getMCU1 = params => { return axios.post(`${base}/log/MCU_fps`, params).then(res => res); };

export const getBinDownload = params => { return axios.post(`${base}/bin/download`, params).then(res => res); };

export const getVideo = params => { return axios.post(`${base}/view_film`, params).then(res => res); };

export const getSqlRes = params => { return axios.post(`${base}/getSqlRes`, params).then(res => res); };

export const removeLog = params => { return axios.post(`${base}/log/remove`, params); };

// statistics

export const getStatistics = params => { return axios.post(`${base}/front_event_id_statistics`, params).then(res => res); };