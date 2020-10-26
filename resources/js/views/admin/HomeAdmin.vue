<template>
    <div class="container">
        <h1 class="main-header">Edit posts</h1>
        <div class="new-post">
            <b-button variant="success" to="/post/create">Add new post</b-button>
        </div>
        <loader v-if="loading"/>
        <div v-else>
            <div class="row">
                <table role="table" aria-busy="false" aria-colcount="3" class="table b-table table-striped table-hover" id="__BVID__22">
                    <thead role="rowgroup" class="">
                    <tr role="row" class="">
                        <th role="columnheader" scope="col" aria-colindex="1" class="">
                            <div>Id</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="2" class="">
                            <div>Title</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="3" class="">
                            <div>Text</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="4" class="">
                            <div>Action</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup">
                    <tr role="row" v-for="post in posts.data">
                        <td aria-colindex="1" role="cell" class="">{{ post.id }}</td>
                        <td aria-colindex="2" role="cell" class="">{{ post.title }}</td>
                        <td aria-colindex="3" role="cell" class="">{{ post.text }}</td>
                        <td aria-colindex="4" role="cell" class="">
                            <div class="table-actions">
                                <b-button :to="{ name: 'postEdit', params: { slug: post.slug  }}">Edit</b-button>
                                <b-button @click="deletePost(post.slug)" variant="danger">Delete</b-button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="row justify-content-center main-pagination">
                <pagination :data="posts" @pagination-change-page="paginate"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
    data: () => ({
        per_page: 3,
        loading: true,
        posts: {}
    }),
    async mounted() {
        this.posts = await this.fetchPosts(this.per_page)
        this.loading = false
    },
    methods: {
        ...mapActions(['fetchPosts', 'getResults', 'destroyPost']),
        async paginate(page = 1) {
            this.loading = true
            this.posts =  await this.getResults({
                'per_page': this.per_page,
                'page': page
            })
            this.loading = false
        },
        async deletePost(slug) {
            this.loading = true
            let destroy = await this.destroyPost(slug)
            if (destroy) {
                this.posts = await this.fetchPosts(this.per_page)
                this.$toast.open(destroy.message);
            }
            this.loading = false
        }
    }
}
</script>
