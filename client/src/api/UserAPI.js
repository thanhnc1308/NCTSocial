import BaseAPI from "./BaseAPI";

export default class UserAPI extends BaseAPI {
    /**
   * prefix of api
   */
    prefix = '/users';

    getFriends(userId) {
        const url = `${this.getUrl()}/${userId}/friends`;
        return this.service.request({
            url: url,
            method: "get"
        });
    }

    follow(currentUserId, userId) {
        const url = `${this.getUrl()}/${currentUserId}/follow`;
        return this.service.request({
            url: url,
            method: "put",
            data: {
                followedUserId: userId
            }
        });
    }

    unfollow(currentUserId, userId) {
        const url = `${this.getUrl()}/${currentUserId}/unfollow`;
        return this.service.request({
            url: url,
            method: "put",
            data: {
                followedUserId: userId
            }
        });
    }
}
