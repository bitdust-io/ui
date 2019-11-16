import store from '../store';

const ModalService = {
    openModal(config) {
        this.config = {
            ...this.makeDefaultValues(),
            ...config
        };
        store.dispatch('updateOpenModal', true);
    },

    getModal() {
        return this.config;
    },

    closeModal() {
        store.dispatch('updateOpenModal', false);
    },

    makeDefaultValues() {
        return {
            transitionFrom: 'right',
            size: this.makeDefaultModalSize(),
            type: 'side',
            isMobileMenu: false,
            showCloseButton: true
        };
    },

    makeDefaultModalSize() {
        return window.innerWidth >= 768 ? 'lg' : 'sm';
    }
};

export default ModalService;
