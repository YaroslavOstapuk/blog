<template>
    <div id="main">
        <Header/>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '../components/Header'

export default {
    created: function () {
        axios.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401) {
                    this.$store.dispatch("logout")
                }
                throw err;
            });
        });
    },
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(errorObject) {
            this.$toast.open({
                message: 'System error',
                type: 'error',
            })
        }
    },
    components: {Header}
}
</script>
