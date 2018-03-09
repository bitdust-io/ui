<template>
    <div class="user-files">
        <label for="search">
            Search
        </label>
        <input type="text"
               v-model="search"
               placeholder="Search file by name"
               id="search"/>
        <ul>
            <li v-for="item in filteredList" @click="openFile(item.path)">
                <span @click="deleteFile(item.path)"
                      class="delete">x</span>
                {{item.name}}
            </li>
        </ul>
        <div v-if="isFileOpen">
            open
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                isFileOpen: false,
                search: ''
            };
        },
        methods: {
            ...mapActions([
                'getApiFiles',
                'deleteFile',
                'openFile'
            ])
        },
        computed: {
            ...mapGetters([
                'getFiles'
            ]),
            filteredList() {
                return this.getFiles.filter(file => {
                    return file.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/variables";

    ul {
        display: flex;
        flex-flow: row wrap;
        align-content: space-between;
        justify-content: space-between;
    }

    input {
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 10px;
        font-size: .9rem;
    }

    li {
        background: $color-white;
        cursor: pointer;
        height: 50px;
        border-radius: 20px;
        width: 160px;
        list-style: none;
        margin: 10px;
        overflow: hidden;
        font-size: .8rem;
        padding-right: 10px;

        &:hover {
            opacity: .6;
        }

        .delete {
            background: red;
            color: white;
            padding: 18px 10px;
            display: inline-block;
            cursor: pointer;
            &:hover {
                opacity: .4;
            }
        }
        .open {
            background: green;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
    }

</style>
