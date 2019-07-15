import { request, POST, GET, PUT, DELETE } from '@/utils/http';

/**
 * 登录/注册
 */

const MERCHANT_MODEL = '/usermanager';

class logincontrollers {

    /**
     * 登录前获取token，用于对比验证码
     * @return {Promise}
     */
    getLoginToken() {
        return GET(`${MERCHANT_MODEL}/console/login/getToken`, {}, false).then(res => res)
    }

    /**
     * 获取图形验证码
     * @return {Promise}
     */
    getLoginCodeImg(params) {
        // return POST(`${MERCHANT_MODEL}/login/getVerifyCode`, data, true).then(res => res)
        return request(`${MERCHANT_MODEL}/console/login/getVerifyCode`, {
            params,
            responseType: 'arraybuffer',
            method: 'POST'
        }, true).then(res => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        })
    }

    /**
     * 登录接口
     * @return {Promise}
     */
    login(data) {
        return POST(`${MERCHANT_MODEL}/console/login/login`, data, true).then(res => res)
    }

    /**
     * 根据token获取登录信息
     * @return {Promise}
     */
    loginByToken(data) {
        return POST(`${MERCHANT_MODEL}/console/login/loginByToken`, data, true).then(res => res)
    }

    /**
     * 忘记密码
     * @return {Promise}
     */
    updatePassword(data) {
        return POST(`${MERCHANT_MODEL}/console/login/forgotPassword`, data).then(res => res)
    }

    /**
     * 登出
     * @return {Promise}
     */
    logout() {
        return POST(`${MERCHANT_MODEL}/console/login/logout`).then(res => res)
    }
}

const controllers = new logincontrollers()

export default controllers
