import BaseAPI from "./BaseAPI";
import { Log } from './../utils/Log';
export default class AuthAPI extends BaseAPI {
    /**
   * prefix of api
   */
    prefix = '/auth';

    async login(userCredentials, dispatch) {
        dispatch({
            type: 'LOGIN_START'
        })
        try {
            const user = await this.request({
                url: '/login',
                method: 'post',
                payload: userCredentials
            })
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user
            })
        } catch (e) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: e
            })
        }
    }

    async register(userCredentials) {
        try {
            return await this.request({
                url: '/register',
                method: 'post',
                payload: userCredentials
            })
        } catch (e) {
            Log.exception(e);
            return e;
        }
    }
}
