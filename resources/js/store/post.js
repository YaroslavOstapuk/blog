export default {
    state: {
        postError: {}
    },
    getters: {
        postError(state) {
          return state.postError
        }
    },
    mutations: {
        setPostError(state, payload) {
            state.postError = payload
        },
        createPost(state, payload) {
            state.postError = {}
        },
        clearError(state, payload) {
            state.postError = {}
        }
    },
    actions: {
        async fetchPosts({commit, dispatch}, per_page) {
            try {
                const post = await axios.get(`/api/v1/posts?per_page=${per_page}`);
                return post.data;
            } catch (e) {
                throw e;
            }
        },
        async fetchPost({commit, dispatch}, slug) {
            try {
                const post = await axios.get(`/api/v1/posts/${slug}`);
                commit('clearError')
                return post.data;
            } catch (e) {
                throw e;
            }
        },
        async getResults({commit, dispatch}, payload) {
            try {
                const posts = await axios.get('/api/v1/posts?per_page='+ payload.per_page +'&page=' + payload.page);
                return posts.data;
            } catch (e) {
                throw e;
            }
        },
        async storePost({commit, dispatch}, payload) {
            try {
                const post = await axios.post(`/api/v1/posts`, payload,   {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (post.status == 200) {
                    commit('createPost')
                    return post.data;
                }
            } catch (error) {
                if (error.response.status == 422) {
                    commit('setPostError', error.response.data.errors)
                }
            }
        },
        async destroyPost({commit, dispatch}, payload) {
            try {
                const result = await axios.delete(`/api/v1/posts/${payload}`)

                if (result.status == 200) {
                    return true;
                }
            } catch (e) {
                throw e
            }
        },
        async updatePost({commit, dispatch}, payload) {
            try {
                const result = await axios.post(`/api/v1/posts/${payload.slug}`, payload.data)

                if (result.status == 200) {
                    return true;
                }
            } catch (error) {
                if (error.response.status == 422) {
                    commit('setPostError', error.response.data.errors)
                }
            }
        }
    }
}
