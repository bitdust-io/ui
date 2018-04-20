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
            <li v-for="item in filteredList"
                @click="openFile(item.path)">
                <span class="icon-file"></span>
                <span class="file-name">{{item.name}}</span>
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
                'deleteFile',
                'openFile',
                'getApiFiles'
            ])
        },
        computed: {
            ...mapGetters([
                'getFiles'
            ]),
            filteredList() {
                if (!this.getFiles) return;
                return this.getFiles.filter(file => {
                    if (file.name.charAt(0) === '.') return;
                    return file.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        created() {
            this.getApiFiles();
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/imports";


    ul {
        display: flex;
        flex-flow: row wrap;
    }

    input {
        border: 1px solid $color-gray-2;
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 10px;
        font-size: .9rem;
    }

    ul {
        margin: 20px 0;
    }

    li {

        cursor: pointer;
        width: 160px;
        list-style: none;
        padding: 10px 10px 10px 40px;
        height: 40px;
        margin: 10px;
        background-color: $color-white;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 25px;
        font-size: .8rem;

        &:before {
        }

        &:hover {
            opacity: .6;
        }

        .delete {
            background: red;
            height: 40px;
            color: white;
            padding: 10px;
            display: inline-block;
            cursor: pointer;
            &:hover {
                opacity: .6;
            }
        }
    }
</style>
