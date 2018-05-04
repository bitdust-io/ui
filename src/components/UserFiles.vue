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
            <li v-for="file in filteredList">
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
    @import "../../src/assets/scss/colors";
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
        padding: 10px;
        font-size: .9rem;
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
