import BaseAPI from "./BaseAPI";

export default class PostAPI extends BaseAPI {
    /**
   * prefix of api
   */
    prefix = '/posts';

    getTimelinePosts(userId) {
        let url = `${this.getUrl()}/timeline/${userId}`;
        return this.service.request({
            url: url,
            method: "get"
        });
    }
}
