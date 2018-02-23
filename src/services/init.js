import runBash from '../../../node/bash';
import store from '../store/';

const Init = {

    run() {
        runBash(this.shellCallback);
    },

    shellCallback(error, stdout, stderr) {
        if (error) {
            console.error(error);
        }
        if (stderr) {
            console.error(stderr);
        }
        store.commit('UPDATE_IS_LOADED', true);
    }
};

export default Init;
