<template>
    <div class="container">
        <h1 class="main-header">Articles</h1>
        <loader v-if="loading"/>
        <div v-else>
            <div class="row justify-content-center main-articles">
                <div v-for="article in posts.data"  :key="article.id" class="col-lg-12">
                    <div class="articles">
                        <router-link :to="{ name: 'showPost', params: { slug: article.slug  }}">
                            <div class="articles__img">
                                <img :src="article.media.avatar" alt="">
                            </div>
                        </router-link>
                        <div class="articles__content">
                            <router-link :to="{ name: 'showPost', params: { slug: article.slug  }}">
                                <h3 class="articles__title">
                                    {{ article.title }}
                                </h3>
                            </router-link>
                            <div class="articles__text">
                                {{ article.text }}
                            </div>
                        </div>
                        <router-link :to="{ name: 'showPost', params: { slug: article.slug  }}" class="more">read more</router-link>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center main-pagination">
                <pagination :data="posts" @pagination-change-page="paginate"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        per_page: 2,
        loading: true,
        posts: {}
    }),
    async mounted() {
        this.posts = await this.fetchPosts(this.per_page)
        this.loading = false
    },
    methods: {
        ...mapActions(['fetchPosts', 'getResults']),
        async paginate(page = 1) {
            this.loading = true
            this.posts =  await this.getResults({
                'per_page': this.per_page,
                'page': page
            })
            this.loading = false
        }
    }
}
</script>
