<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="main-header">Edit post</h1>
                <Loader v-if="loading"/>
                <form v-else @submit.prevent="editPost" class="post-form">
                    <b-form-file
                        v-model="post.images"
                        :state="Boolean(post.images)"
                        @input="getFile"
                        placeholder="Choose a image or drop it here..."
                        drop-placeholder="Drop file here..."
                        class="post-form__image"
                    ></b-form-file>
                    <img :src="post.img" v-if="!newImages" class="old-img" alt="">
                    <span v-if="errors.images" class="error">{{ errors.images[0] }}</span>

                    <b-form-input v-model="post.title" placeholder="Enter title post" class="post-form__title"></b-form-input>
                    <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>

                    <div>
                        <editor v-model="post.text"></editor>
                        <span v-if="errors.text" class="error">{{ errors.text[0] }}</span>
                    </div>

                    <div class="post-form__control">
                        <b-button variant="success" class="post-form__btn" type="submit">Edit</b-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Editor from '../../components/Editor'

export default {
    data() {
        return {
            loading: false,
            post: {
                images: null,
                title: '',
                text: '',
                img: ''
            },
            newImages: false,
            slug: ''
        }
    },
    methods: {
        ...mapActions(['updatePost', 'fetchPost']),
        async editPost() {
            this.loading = true

            let formData = new FormData()
            if (this.newImages) {
                formData.append('images', this.post.images)
            }
            formData.append('title', this.post.title)
            formData.append('text', this.post.text)
            formData.append('_method', 'PUT')

            try {
                let result = await this.updatePost({
                    slug: this.slug,
                    data: formData
                })
                if (result) {
                    this.$router.push('/admin')
                    this.$toast.open(result.message);
                }
            } finally {
                this.loading = false
            }
        },
        getFile(file) {
            if (file) {
                this.newImages = true
            } else {
                this.newImages = false
            }
        }
    },
    async mounted() {
        this.loading = true
        let slug = this.$route.params.slug
        this.slug = slug
        let post = await this.fetchPost(slug)

        this.post.title = post.data.title
        this.post.text = post.data.text
        this.post.img = post.data.media.avatar
        this.loading = false
    },
    computed: {
        ...mapGetters({
            errors: 'postError'
        })
    },
    components: {
        Editor
    }
}
</script>
