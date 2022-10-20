import axios from 'axios'

enum Api {
    get= '/get',
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

export const get = (url: string, params: {}, func) => {
    return axios.get(url + Api.get, params)
                .then((res) => {
                    func(res);
                });
};