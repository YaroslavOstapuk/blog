<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <router-link to="/" exact class="header-link">Home</router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-button v-if="!currentUser" v-b-modal.modal-1 class="header-link">Log in</b-button>
                <div class="control-navbar" v-else>
                    <router-link to="/admin" exact class="header-link dashboard">Dashboard</router-link>
                    <b-button @click="removeUser" class="header-link">Log out</b-button>
                </div>
                <Login/>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
import Login from '../components/auth/Login'
import { mapActions, mapGetters } from 'vuex'

export default {
    methods: {
        ...mapActions(['logout']),
        async removeUser() {
            let logout = await this.logout()
            if (logout) {
                this.$toast.open(logout.message);
                if (this.$route.path != '/') {
                    this.$router.push('/');
                }
            }
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    components: {
        Login
    }
}
</script>
