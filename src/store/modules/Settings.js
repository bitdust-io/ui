import api from '../../services/api';

const state = {
    list: []
};

function getKeyName(key) {
    const regex = /^[^/]+/g;
    return regex.exec(key)[0];
}

const getters = {
    getKeys: state => {
        let results = [];
        state.list.filter(item => {
            let itemKey = getKeyName(item.key);
            if (!results.find(result => result === itemKey)) {
                results.push(itemKey);
            }
        });
        return results;
    },
    getPropertyForKey: state => {
        return keyName => {
            return state.list.filter(item => getKeyName(item.key) === keyName)
        };
    }
};

const mutations = {
    updateSettingsList(state, value) {
        state.list = value;
    }
};

const actions = {
    async updateSettingsList({commit}) {
        const {result} = await api.getConfigList();
        commit('updateSettingsList', result);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
