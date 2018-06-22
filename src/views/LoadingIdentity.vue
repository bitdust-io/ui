<template>
    <section class="bg-wave section-loading">
        <article>
            <div class="loading">
                <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                        <rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50">
                            <animateTransform attributeName="transform"
                                              dur="0.5s"
                                                 from="0 50 50"
                                                 to="180 50 50"
                                                 type="rotate"
                                                 id="strokeBox"
                                                 attributeType="XML"
                                                 begin="rectBox.end"/>
                        </rect>
                        <rect x="27" y="27" fill="#fff" width="46" height="50">
                        <animate attributeName="height"
                                 dur="1.3s"
                                 attributeType="XML"
                                 from="50"
                                 to="0"
                                 id="rectBox"
                                 fill="freeze"
                                 begin="0s;strokeBox.end"/>
                      </rect>
                    </svg>
            </div>
            <h1 class="page-title">
                Loading your identity
            </h1>
            <h2 class="page-subtitle">
                one moment please
            </h2>
        </article>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'loading-identity',
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        watch: {
            'connectionStatus': function (response) {
                if (response.status === 'OK') {
                    // this.$router.push('home');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    .loading {
        text-align: center;
    }

    svg {
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .section-loading {
        justify-content: flex-start;
        align-items: center;

        article {
            margin-top: 7.7rem;
        }

        .page-subtitle {
            text-align: center;
            margin-top: 1rem;
        }

    }
</style>

