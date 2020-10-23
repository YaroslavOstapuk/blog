<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="main-header">Create post</h1>
                <Loader v-if="loading"/>
                <form v-else @submit.prevent="createPost" class="post-form">
                    <b-form-file
                        v-model="post.images"
                        :state="Boolean(post.images)"
                        placeholder="Choose a image or drop it here..."
                        drop-placeholder="Drop file here..."
                        class="post-form__image"
                    ></b-form-file>
                    <span v-if="errors.images" class="error">{{ errors.images[0] }}</span>

                    <b-form-input v-model="post.title" placeholder="Enter title post" class="post-form__title"></b-form-input>
                    <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>

                    <div>
                        <ckeditor :editor="editor" v-model="post.text" :config="editorConfig"></ckeditor>
                        <span v-if="errors.text" class="error">{{ errors.text[0] }}</span>
                    </div>

                    <div class="post-form__control">
                        <b-button variant="success" class="post-form__btn" type="submit">Create</b-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            loading: false,
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'insertTable',
                        '|',
                        '|',
                        'mediaEmbed',
                        'undo',
                        'redo'
                    ]
                },
                removePlugins: [],
                placeholder: 'Type the content here!',
            },
            post: {
                images: null,
                title: '',
                text: ''
            }
        }
    },
    methods: {
        ...mapActions(['storePost']),
        async createPost() {
            this.loading = true
            let formData = new FormData();
            formData.append('images', this.post.images);
            formData.append('title', this.post.title);
            formData.append('text', this.post.text);

            try {
                const result = await this.storePost(formData)
                if (result.message) {
                    this.$router.push('/admin')
                    this.$toast.open('Post successfully created!');
                }
            } catch (e) {

            } finally {
                this.loading = false
            }

        }
    },
    computed: {
        ...mapGetters({
            errors: 'postError'
        })
    }
}
</script>
