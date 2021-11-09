import BaseAPI from "./BaseAPI";

export default class MessageAPI extends BaseAPI {
    /**
     * prefix of api
     */
    prefix = '/messages';

    getByConversationId(conversationId) {
        const url = `${this.getUrl()}/${conversationId}`;
        return this.service.request({
            url: url,
            method: "get"
        });
    }
}
