import axios from 'axios'

export enum Api {
    get = '/get',
    getCustomer = '/api/customer/get',
    deleteCustomer = '/api/customer/delete',
    login = "/api/login",
    register = "/api/register",
    positionList = '/sys/position/list',
    userList = '/sys/user/list',
    roleList = '/sys/role/list',
    queryDepartTreeSync = '/sys/sysDepart/queryDepartTreeSync',
    queryTreeList = '/sys/sysDepart/queryTreeList',
    loadTreeData = '/sys/category/loadTreeData',
    loadDictItem = '/sys/category/loadDictItem/',
    getDictItems = '/sys/dict/getDictItems/',
    getTableList = '/sys/user/queryUserComponentData',
    getCategoryData = '/sys/category/loadAllData',
}

export const baseUrl = "http://localhost:3001";

export const get = (url=baseUrl, params={}) => {
    return axios({
        url: url,
        method: 'GET',
        params: params
    });
};

export const del = (url=baseUrl, params={}) => {
    return axios({
        url: url,
        method: 'DELETE',
        params: params,
    });
};

export const put = (url=baseUrl, params={}) => {
    return axios({
        url: url,
        method: 'PUT',
        params: params,
    });
};

export const post = (url=baseUrl, params={}) => {
    return axios({
        url: url,
        method: 'POST',
        params: params,
    });
};