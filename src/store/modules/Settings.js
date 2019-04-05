import api from '../../services/api';

const state = {
    configList: [],
    serviceList: []
};

function getKeyName(key) {
    const regex = /^[^/]+/g;
    return regex.exec(key)[0];
}

function getServiceKeyName(key) {
    if (!key) return;
    const regex = /\/(.*)(\/)/g;
    return regex.exec(key)[1];
}

const getters = {
    getConfigKeys: state => {
        let results = [];
        state.configList.filter(item => {
            let itemKey = getKeyName(item.key);
            if (!results.find(result => result === itemKey || itemKey === 'services')) {
                results.push(itemKey);
            }
        });
        return results;
    },
    getServiceByKey: state => {
        return key => {
            return state.serviceList.find(item => key === item.name);
        };
    },
    getConfigForKey: state => {
        return keyName => {
            return state.configList.filter(item => getKeyName(item.key) === keyName);
        };
    },
    getServiceConfigForKey: (state, getters) => {
        return key => {
            key = key.replace('service_', '').replace('_', '-');
            return getters.getConfigForKey('services').find(item => getServiceKeyName(item.key) === key);
        };
    }
};

const mutations = {
    updateConfigList(state, value) {
        state.configList = value;
    },
    updateServiceList(state, value) {
        state.serviceList = value;
    }
};

const actions = {
    async updateConfigList({commit}) {
        const {result} = await api.getConfigList();
        commit('updateConfigList', result);
    },
    async updateServiceList({commit}) {
        const {result} = await api.getServiceList();
        commit('updateServiceList', result);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
