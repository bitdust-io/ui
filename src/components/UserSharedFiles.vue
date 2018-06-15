<template>
    <div class="user-files">
        <label for="search"
               class="search">
            Search
        </label>
        <input v-model="search"
               placeholder="type a file name"
               id="search"/>


        <ul>
            <li v-for="file in filteredList" v-if="">
                <file-extension :file="file.path"/>
                <span class="file-name"
                      @click="openFile(file.path)">{{file.name}}</span>
                <file-detail :file="file"/>
            </li>
        </ul>
        <div v-if="isFileOpen">
            open
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import FileDetail from '../components/FileDetail';
    import FileExtension from '../components/FileExtension';

    export default {
        data() {
            return {
                isFileOpen: false,
                search: ''
            };
        },
        components: {
            FileDetail,
            FileExtension
        },
        methods: {
            ...mapActions([
                'deleteFile',
                'openFile',
                'getApiSharedFiles'
            ])
        },
        computed: {
            ...mapGetters([
                'getSharedFiles',
                'getIdentity'
            ]),
            filteredList() {
                if (!this.getSharedFiles) return;
                return this.getSharedFiles.filter(file => {
                    if (file.name.charAt(0) === '.') return;
                    return file.name.toLowerCase().includes(this.search.toLowerCase()) &&
                        file.key_id.indexOf(this.getIdentity.global_id) === -1;
                });
            }
        },
        created() {
            this.getApiSharedFiles();
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .search {
        font-size: .9rem;
    }

    ul {
        display: flex;
        flex-flow: row wrap;
        margin: 20px 0;
    }

    input {
        border: 1px solid $color-gray-2;
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 6px;
        font-size: .8rem;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    li {
        background: $color-white;
        width: 210px;
        list-style: none;
        padding: 10px 4px 10px 14px;
        height: 40px;
        margin: 10px;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 25px;
        font-size: .8rem;
        display: flex;
        justify-content: space-around;
    }

    .file-name {
        overflow: hidden;
        line-height: 22px;
        max-width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        padding-right: 10px;
        &:hover {
            opacity: .6;
        }
    }
</style>
