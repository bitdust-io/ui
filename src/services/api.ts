import {ApiTypes, HealthInterface, IdentityInterface} from '@/types/apiTypes';
import {FriendInterface} from '@/types/chatTypes';

const Api: ApiTypes = {

    constants: {
        PORT: '8180',
        API_URL: 'http://localhost',
        API_VERSION: 'v1',
        OK: 'OK',
        ERROR: 'ERROR'
    },

    sendMessage(data: any) {
        return fetch(this.makeApiEndpoint('message/send'), {
            method: 'POST',
            body: JSON.stringify({
                'global_id': data.user.global_id,
                'data': {
                    'message': data.message
                }
            })
        }).then(res => res.json());
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
