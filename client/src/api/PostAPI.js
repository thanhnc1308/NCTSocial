import BaseAPI from "./BaseAPI";

export default class PostAPI extends BaseAPI {
    /**
   * prefix of api
   */
    prefix = '/posts';

    getTimelinePosts(userId) {
        const url = `${this.getUrl()}/timeline/${userId}`;
        return this.service.request({
            url: url,
            method: "get"
        });
    }

    toggleLike(postId, userId) {
        const url = `${this.getUrl()}/${postId}/toggle_like`;
        return this.service.request({
            url,
            method: 'put',
            data: {
                userId
            }
        })
    }
}
