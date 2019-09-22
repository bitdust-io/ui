<template>
    <div class="user-files">
        <label for="search"
               class="search">
            Search
        </label>
        <input v-model="search"
               placeholder="type a file name"
               id="search"/>

        <div v-if="Files.filesErrorLoading"
             class="loading-wrapper">
            <icon name="loading"
                  class="rotating"
                  size="lg"/>
            Loading files
        </div>

        <div v-if="filteredList.length === 0 && !Files.filesErrorLoading && search.length === 0"
             class="no-files">
            You don't have any file uploaded yet, try to upload your first ;)
        </div>
        <div class="no-files"
             v-if="search.length !== 0 && filteredList.length === 0">
            No files founded
        </div>

        <ul>
            <li v-for="(file, index) in filteredList"
                :key="index">
                <file-extension :file="file.path"/>
                <span class="file-name"
                      @click="open(file.path)">{{file.name}}</span>
                <file-detail :file="file"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import FileDetail from './FileDetail';
    import FileExtension from './FileExtension';
    import Icon from '@/components/Globals/Icon';

    export default {
        data() {
            return {
                search: '',
                isFilesLoading: true
            };
        },
        props: {
            setKey: {
                type: String
            }
        },
        components: {
            FileDetail,
            FileExtension,
            Icon
        },
        methods: {
            ...mapActions([
                'deleteFile',
                'getApiFiles',
                'getApiFilesForKey'
            ]),
            setFileLoading(value) {
                this.isFilesLoading = value;
            },
            open(file) {
                this.$emit('open', file);
            }
        },
        computed: {
            ...mapGetters([
                'getFiles'
            ]),
            ...mapState(['Files']),
            filteredList() {
                if (!this.getFiles) return;
                this.setFileLoading(false);
                return this.getFiles.filter(file => {
                    if (file.name.charAt(0) === '.') return;
                    return file.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        created() {
            this.getApiFiles();
        },
        watch: {
            setKey(key) {
                key ? this.getApiFilesForKey({key}) : this.getApiFiles();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .no-files {
        text-align: center;
        margin: 30px auto;
        max-width: 50%;
    }

    .loading-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 80px;
        font-size: 1rem;
        padding-top: 20px;

        i {
            margin-top: -55px;
        }
    }

    .search {
        font-size: .9rem;
        cursor: pointer;
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
