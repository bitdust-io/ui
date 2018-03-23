import api from './api';

const Message = {

    sendMessage(data) {
        return fetch(api.makeApiEndpoint('message/send'), {
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
        return fetch(api.makeApiEndpoint('message/receive/electron_ui_consumer')).then(res => res.json());
    }
};

export default Message;
