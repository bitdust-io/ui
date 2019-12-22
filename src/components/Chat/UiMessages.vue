<template>
    <div>
        {{messages}}

        <beautiful-chat :participants="participants"
                        :editable="false"
                        :titleImageUrl="titleImageUrl"
                        :onMessageWasSent="onMessageWasSent"
                        :messageList="messageList"
                        :newMessagesCount="newMessagesCount"
                        :isOpen="isChatOpen"
                        :close="closeChat"
                        :icons="icons"
                        :open="openChat"
                        :showEmoji="true"
                        :showFile="false"
                        :showTypingIndicator="showTypingIndicator"
                        :colors="colors"
                        :alwaysScrollToBottom="true"
                        :messageStyling="messageStyling"
                        @onType="handleOnType">

            <template v-slot:header class="buttons">
                <nav class="buttons">
                    <b-button rounded
                              to="/chat"
                              tag="router-link"
                              icon-left="chevron-left"/>

                    <div class="is-flex first-letter">
                        <FirstLetter :name="$route.params.id"
                                     size="34"
                                     class="first-letter"/>

                        <p v-if="friend">
                            {{ friend.username }}
                        </p>
                    </div>
                    <b-button rounded
                              icon-left="cog"/>
                </nav>
            </template>

            <template v-slot:user-avatar="{user}">
                <div>
                    <FirstLetter :name="user.id"
                                 size="20"
                                 class="first-letter"/>
                </div>
            </template>
        </beautiful-chat>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Chat from 'vue-beautiful-chat';
    import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png';
    import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg';
    import FileIcon from 'vue-beautiful-chat/src/assets/file.svg';
    import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import {FriendInterface} from '@/types/chatTypes';
    import api from '@/services/api';

    Vue.use(Chat);
    @Component({
        components: {FirstLetter}
    })
    export default class ChatMessages extends Vue {
        @Prop() private friend!: FriendInterface;
        @Prop() private identity!: IdentityResultInterface;
        @Prop() private messages!: any;

        messageList = this.messages;
        icons = {
            open: {
                img: OpenIcon,
                name: 'default'
            },
            close: {
                img: CloseIcon,
                name: 'default'
            },
            file: {
                img: FileIcon,
                name: 'default'
            },
            closeSvg: {
                img: CloseIconSvg,
                name: 'default'
            }
        };

        participants = [
            {
                id: 'me',
                name: this.identity.name
            },
            {
                id: this.friend.global_id,
                name: this.friend.username
            }
        ];

        titleImageUrl = 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png';
        newMessagesCount = 0;
        isChatOpen = true;
        showTypingIndicator = '';
        colors = {
            header: {
                bg: '#fff',
                text: '#404040'
            },
            launcher: {
                bg: '#4e8cff'
            },
            messageList: {
                bg: '#ffffff'
            },
            sentMessage: {
                bg: '#4e8cff',
                text: '#ffffff'
            },
            receivedMessage: {
                bg: '#eaeaea',
                text: '#222222'
            },
            userInput: {
                bg: '#f4f7f9',
                text: '#565867'
            }
        };
        messageStyling = true;

        onMessageWasSent(message: any) {
            const data = {
                global_id: this.friend.global_id,
                data: {
                    message: message.data.text || message.data.emoji,
                    type: message.type
                }
            };
            api.sendMessage(data);
        }

        openChat() {
            this.isChatOpen = true;
            this.newMessagesCount = 0;
        }

        closeChat() {
            this.isChatOpen = false;
        }

        handleOnType() {
            console.log('Emit typing event');
        }
    }
</script>

<style lang="scss" scoped>
    .buttons {
        justify-content: space-between;
        display: flex;
        width: 100%;
        align-items: center;
    }

    .first-letter {
        align-items: center;
    }

</style>
