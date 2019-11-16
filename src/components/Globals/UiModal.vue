<template>
    <transition name="modal">
        <div v-if="getModalShouldOpen"
             class="modal"
             :class="{'modal-side': componentConfig.type === 'side',
                      'modal-center': componentConfig.type === 'center',
                      'modal-from-left': componentConfig.transitionFrom === 'left',
                      'modal-from-right': componentConfig.transitionFrom === 'right',
                      'modal-from-top': componentConfig.transitionFrom === 'top'}">

            <div class="backdrop" @click="closeModal"></div>

            <div @close="closeModal"
                 class="modal-container"
                 :class="[{'is-menu': componentConfig.isMobileMenu},componentConfig.size]">
                <span @click="closeModal"
                      v-if="componentConfig.showCloseButton"
                      class="modal-close close-icon"
                      :class="componentConfig.type">
                </span>
                <component :is="componentConfig.component"
                           @closeModal="closeModal"
                           :data="componentConfig.props"></component>
            </div>
        </div>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex';
    import ModalService from '@/services/modal';
    import Icon from '@/components/Globals/Icon';

    export default {
        name: 'UiModal',
        data() {
            return {
                componentConfig: {
                    component: undefined,
                    url: undefined,
                    type: 'side',
                    transitionFrom: 'left',
                    size: 'sm',
                    isMobileMenu: true,
                    showCloseButton: false
                }
            };
        },
        methods: {
            closeModal() {
                ModalService.closeModal();
            }
        },
        computed: {
            ...mapGetters(['getModalShouldOpen'])
        },
        watch: {
            'getModalShouldOpen': function (data) {
                if (data) {
                    this.componentConfig = ModalService.getModal();
                }
            }
        },
        components: {
            Icon
        },
        created() {
            document.addEventListener('keydown', event => {
                if (event.code === 'Escape' && this.getModalShouldOpen) {
                    this.closeModal();
                }
            });
        },
        destroyed() {
            document.removeEventListener('keydown', this.closeModal);
        }
    };
</script>
<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    $modal-sm-width: 280px;
    $modal-md-width: 480px;
    $modal-lg-width: 600px;
    $modal-center-height: 100px;

    .modal {
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        transition: transform 0.3s ease-out;
        z-index: 100;

        .sm {
            width: $modal-sm-width;
            padding: 0;
        }

        .md {
            width: $modal-md-width;
        }

        .lg {
            width: $modal-lg-width;
        }

        &.modal-side {

            .modal-container {
                background: $color-gray-1;
                border: none;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
                height: 100vh;
                position: relative;
                transform: none;
                transition: transform 0.3s ease-out;
            }
        }

        &.modal-center {
            left: 50%;
            display: flex;
            align-items: center;
            right: auto;

            .modal-container {
                background: $color-gray-3;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
                min-height: $modal-center-height;
                position: relative;
                transform: none;
                padding: 1em;
                transition: transform 0.3s ease-out;
            }
        }

        &.modal-from-left {
            left: 0;
            right: auto;
        }

        &.modal-from-right {
            left: auto;
            right: 0;
        }

        &.modal-enter-active,
        &.modal-leave {
            transition: transform 0s ease-out;
        }
    }

    .modal-center {
        .modal-container {
            margin-top: -1 * $modal-center-height / 2;
        }

        .sm {
            margin-left: -1 * $modal-sm-width / 2;
        }

        .md {
            margin-left: -1 * $modal-md-width / 2;
        }

        .lg {
            margin-left: -1 * $modal-lg-width / 2;
        }
    }

    .modal-enter,
    .modal-enter-active,
    .modal-leave,
    .modal-leave-active {
        &.modal-from-left {
            .modal-container {
                transform: translateX(-102%);
            }

            .backdrop {
                opacity: 0;
            }
        }

        &.modal-from-right {
            .modal-container {
                transform: translateX(100%);
            }

            .backdrop {
                opacity: 1;
            }
        }

        &.modal-from-top {
            .modal-container {
                transform: translateY(-100%);
            }

            .backdrop {
                opacity: 1;
            }
        }
    }

    .backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        bottom: 0;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        z-index: 0;
        transition: opacity 0.3s ease-out;
    }

    .modal-close {
        cursor: pointer;
        display: block;
        font-size: 20px;
        left: -20px;
        line-height: 0;
        margin-right: -20px;
        position: absolute;
        text-align: center;
        top: 10px;
        z-index: 1;

        &.center {
            position: relative;
            width: 40px;
            left: calc(100% - 40px);
            margin-top: -10px;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }

            .close-icon {
                margin-left: 0;
            }
        }

        &:before {
            margin: 0;
        }

        &.close-icon {
            width: 40px;
            height: 40px;
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIzOHB4IiBoZWlnaHQ9IjM4cHgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5TTFVJVDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz4gICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iOC40MSA3IDEzLjQxIDEyIDEyIDEzLjQxIDcgOC40MSAyIDEzLjQxIDAuNTkgMTIgNS41OSA3IDAuNTkgMiAyIDAuNTkgNyA1LjU5IDEyIDAuNTkgMTMuNDEgMiI+PC9wb2x5Z29uPiAgICA8L2RlZnM+ICAgIDxnIGlkPSJHbGFzdmV6ZWwtcHJlLW9yZGVyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJEVC1ETC1nbGFzdmV6ZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NzEuMDAwMDAwLCAtMzIuMDAwMDAwKSI+ICAgICAgICAgICAgPGcgaWQ9IlNMVUlUIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NzEuMDAwMDAwLCAzMi4wMDAwMDApIj4gICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzAwOTlGRiIgY3g9IjE5IiBjeT0iMTkiIHI9IjE5Ij48L2NpcmNsZT4gICAgICAgICAgICAgICAgPGcgaWQ9Ikljb24vMDEuLVVJL+KGsy1QYXJ0cy9DbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy4wMDAwMDAsIDcuMDAwMDAwKSI+ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i4oazLUNvbG9yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1LjAwMDAwMCwgNS4wMDAwMDApIj4gICAgICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+ICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXNrPiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgaWQ9Ik1hc2siIGZpbGw9IiMzMzMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+ICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkNvbG9yL86pLUZvci1pY29ucy8wNS4tV2hpdGUtKCNGRkZGRkYpIiBtYXNrPSJ1cmwoI21hc2stMikiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNS4wMDAwMDAsIC01LjAwMDAwMCkiIGlkPSJDb2xvci8wNC4tR3JleS8wOS4tV2hpdGUiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuKGsy1Db2xvciIgZmlsbD0iI0ZGRkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48L3JlY3Q+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
