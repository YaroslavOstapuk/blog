<template>
    <b-modal ref="my-modal" id="modal-1" centered hide-footer>
        <div class="d-block text-center">
            <form @submit.prevent="authenticate" class="login-form">
                <div class="form-group custom-form">
                    <b-form-input type="email" name="email" :class="{ error: errors.email }" v-model.trim="form.email" placeholder="Enter email"></b-form-input>
                    <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
                </div>
                <div class="form-group custom-form">
                    <b-form-input  type="password" name="password" :class="{ error: errors.password }" v-model.trim="form.password" placeholder="Enter password"></b-form-input>
                    <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
                </div>
                <span v-if="errors.message" class="error">{{ errors.message }}</span>
                <b-button variant="success" type="submit">Log in</b-button>
            </form>
        </div>
    </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        form: {
            email: '',
            password: ''
        }
    }),
    methods: {
        ...mapActions(['login']),
        async authenticate() {
            if (await this.login(this.form)) {
                this.$refs['my-modal'].hide()
                this.$router.push('/admin')
            }
        }
    },
    computed: {
        ...mapGetters({
            errors: 'loginErrors'
        })
    }
}
</script>
