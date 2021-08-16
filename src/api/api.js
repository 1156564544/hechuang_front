import axios from 'axios';

let base = 'http://124.71.27.112:9000';

// let base = '/api';

export const requestLogin = params => { return axios.post(`${base}/userlogin`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const getUserListPage = params => { return axios.post(`${base}/user/listpage`, params).then(res => res); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const editUser = params => { return axios.post(`${base}/user/edit`, params).then(res => res.data); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// device

// export const getDeviceListPage = params => { return axios.get(`${base}/device/listpage`, { params: params }); };

export const getDeviceListPage = params => { return axios.post(`${base}/device/listpage`, params).then(res => res); };

// export const editDevice = params => { return axios.get(`${base}/device/edit`, { params: params}); };

export const editDevice = params => { return axios.post(`${base}/device/edit`, params).then(res => res.data); };

export const trafficControl = params => { return axios.post(`${base}/traffic/control`, params).then(res => res.data); };

// log

export const getLogListPage = params => { return axios.post(`${base}/log/listpage`, params).then(res => res); };

export const getPicture = params => { return axios.post(`${base}/log/picture`, params).then(res => res); };

export const getBinDownload = params => { return axios.post(`${base}/bin/download`, params).then(res => res); };

export const getVideo = params => { return axios.post(`${base}/view_film`, params).then(res => res); };