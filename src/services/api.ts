import {ApiTypes, HealthInterface, IdentityInterface, MessageInterface} from '@/types/apiTypes';
import {FriendInterface} from '@/types/chatTypes';

const Api: ApiTypes = {

    constants: {
        PORT: '8180',
        API_URL: 'http://localhost',
        API_VERSION: 'v1',
        OK: 'OK',
        ERROR: 'ERROR'
    },

    sendMessage(data: MessageInterface) {
        return this.makePost('message/send', data);
    },

    getMessages() {
        return this.makeGet('message/receive/electron_ui_consumer');
    },

    getFriends(): Promise<Array<FriendInterface>> {
        return this.makeGet('friend/list');
    },

    getUser() {
        return this.makeGet('config/get/personal/nickname');
    },

    processHealth(): Promise<HealthInterface> {
        return this.makeGet('process/health');
    },

    getIdentity(): Promise<IdentityInterface> {
        return this.makeGet('identity/get');
    },

    networkConnected(): Promise<any> {
        return this.makeGet('network/connected');
    },

    async makePost(service: string, data: any, params?: string) {
        return fetch(this.makeApiEndpoint(service, params), {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    makeGet(service: string, params?: string): Promise<any> {
        return fetch(this.makeApiEndpoint(service, params)).then(r => r.json());
    },

    makeApiEndpoint(service: string, params?: string): string {
        const baseUrl = this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION;
        const apiUrl = new URL(baseUrl);
        if (params) {
            // TODO Create params
            apiUrl.searchParams.append(params, params);
        }
        return apiUrl.href;
    }
};

export default Api;
