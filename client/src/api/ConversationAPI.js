import BaseAPI from "./BaseAPI";

export default class ConversationAPI extends BaseAPI {
    /**
     * prefix of api
     */
    prefix = '/conversations';

    getByUserId(userId) {
        const url = `${this.getUrl()}/${userId}`;
        return this.service.request({
            url: url,
            method: "get"
        });
    }
}
