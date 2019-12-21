export interface ChatStateInterface {
    messages: Array<ChatContentInterface>;
    friends: Array<FriendInterface>
}

export interface ChatContentInterface {
    message: string;
    sender: string;
}

export interface FriendInterface {
    alias: string;
    // eslint-disable-next-line camelcase
    contact_stat: string;
    // eslint-disable-next-line camelcase
    contact_statu: string;
    // eslint-disable-next-line camelcase
    global_id: string;
    idhost: string;
    idurl: string;
    username: string;
}
