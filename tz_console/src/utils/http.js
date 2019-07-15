/**
 * axios 网络请求封装
 */
import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '../store'
import url from './http_conf'
import { getToken,setToken,removeToken } from './auth'
import service from './request'

import qs from 'qs'

const port = '';
const http_url = url + (port == '' ? '' : (':' + port)) + '/'
const instance = axios.create();

instance.defaults.baseURL = http_url;

const isFormData = (v) => {
    return Object.prototype.toString.call(v) === '[object FormData]';
}

/**
 *axios 全局 拦截器
 */
instance.interceptors.response.use(function(response) {
    //这里统一处理服务器code
    //忽略返回类型, 取消拦截判断
    const ignoreContentTypeList = ['image/gif', 'application/vnd.ms-excel;charset=utf-8'];
    if (ignoreContentTypeList.indexOf(response.headers['content-type']) > -1) return response.data;

    const Code = response.data.code;
    if (Code === 200) {    //成功拦截
        return response.data;
    }else if (Code == 501) {
        Vue.prototype.$message.error('后台服务出错');
        return {};
    }else if(Code === 10000){
        Vue.prototype.$message.error('后台服务出错')
        return {};
    }else if (Code.toString().length === 5) {
        //自定义错误码
        if (Code === 20003 || Code === 20004 || Code === 20006 || Code === 30021) {
            Vue.prototype.$message.error('登录过期了');
            MessageBox.confirm(
                '你已被登出，可以取消继续留在该页面，或者重新登录',
                '确定登出',
                {
                  confirmButtonText: '重新登录',
                  cancelButtonText: '取消',
                  type: 'warning'
                }
            )
            removeToken()
            router.push({ path: '/login' });
        }else if(Code === 10002){
            setTimeout(()=>{
                Vue.prototype.$message.error('账号未登录')
            },0)
            removeToken()
            router.push({ path: '/login' });
        }

        Vue.prototype.$message.error('[' + Code + ']' + response.data.message);
        return Promise.reject(response.data);
    }else{
        return response;
    }

}, function(error) {
    // let err= error.response.data ;
    // if(err.code === 10000) Vue.prototype.$message.error(err.message);
    // console.log(error.response);
    Vue.prototype.$message.error('请求出错' + error);
    return Promise.reject(error);
});

instance.interceptors.request.use(function(response) {
	if (response.url.indexOf('/RtcRoomServer/') > -1) {
		// response.baseURL = 'http://192.168.90.94:8717'
		response.data = qs.stringify(response.data)
	} else {
		response.baseURL = http_url
	}
	return response
}, function(error) {
	return Promise.reject(error);
});

/**
 * Request
 * @param {String} url
 * @param {Object} options request参数
 * @param {Boolean} tokenFlag 是否置入token,默认为true
 */
export const request = (url, options = {}, tokenFlag = true) => {
    if (tokenFlag) {
        //置入token
        options.headers = Object.assign(options.headers || {}, {
            'token': store.state.user.token
        });
    }
    options = {
        url,
        ...options
    }
    return instance.request(options);
}

/**
 * POST
 * @param {String} url
 * @param {Object} data data参数
 * @param {Boolean} tokenFlag 是否置入token,默认为true
 */
export const POST = (url, data = {}, tokenFlag = true) => {


    const options = {};
    if (tokenFlag) {
        //置入token
        options.headers = {
            'token': store.state.user.token,
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    // if (!isFormData(data)) data = qs.stringify(data);
    return instance.post(url, data, options);
}

/**
 * GET
 * @param {String} url
 * @param {Object} data data参数
 * @param {Boolean} tokenFlag 是否置入token,默认为true
 */
export const GET = (url, options = {}, tokenFlag = true) => {
    if (tokenFlag) {
        //置入token
        options.headers = {
            'token': store.state.user.token,
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    return instance.get(url, options);
}

/**
 * PUT
 * @param {String} url
 * @param {Object} data data参数
 * @param {Boolean} tokenFlag 是否置入token,默认为true
 */
export const PUT = (url, params = {}, tokenFlag = true) => {
    const options = {};
    if (tokenFlag) {
        //置入token
        options.headers = {
            'token':store.state.user.token
        }
    }
    return instance.put(url, params, options);
}


/**
 * DELETE
 * @param {String} url
 * @param {Object} data data参数
 * @param {Boolean} tokenFlag 是否置入token,默认为true
 */
export const DELETE = (url, params = {}, tokenFlag = true) => {
    const options = {
        data: params
    };
    if (tokenFlag) {
        //置入token
        options.headers = {
            'token': store.state.user.token
        }
    }
    return instance.delete(url, options);
}

export default request
