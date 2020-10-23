<template>
    <div class="container">
        <div class="row">
            <loader v-if="loading"/>
            <div v-else class="col-lg-12">
                <b-breadcrumb :items="items"></b-breadcrumb>
                <div class="full-article">
                    <div class="full-article__img">
                        <b-img :src="post.media.default" fluid alt="Responsive image"></b-img>
                    </div>
                    <h2 class="full-article__title">
                        {{ post.title }}
                    </h2>
                    <div class="full-article__text" v-html="post.text">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        items: [
            {
                text: 'home',
                to: '/'
            },
            {
                text: '',
                active: true
            }
        ],
        loading: true,
        post: {}
    }),
    async mounted() {
        const slug = this.$route.params.slug
        this.items[1].text = slug
        const post = await this.fetchPost(slug)
        this.post = post.data
        this.loading = false,
        this.buildOembed()
    },
    methods: {
        ...mapActions(['fetchPost']),
        buildOembed() {
            setTimeout(function(scope) {
                document.querySelectorAll( 'oembed[url]' ).forEach( element => {
                    const anchor = document.createElement( 'a' );

                    anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
                    anchor.className = 'embedly-card';

                    element.appendChild( anchor );
                } );
            }, 1, this);
        }
    }
}
</script>
