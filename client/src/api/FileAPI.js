import BaseAPI from "./BaseAPI";

export default class PostAPI extends BaseAPI {
    /**
   * prefix of api
   */
    prefix = '/file';

    upload(payload) {
        const url = `${this.getUrl()}/upload`;
        return this.service.request({
            url: url,
            method: "post",
            data: payload
        });
    }
}
