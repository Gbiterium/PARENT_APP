<template>
    <div class="container">
        <div class="py-4 pointer">
            <b-icon-chevron-left class="fs-24" @click.prevent="$router.go(-1)" />
        </div>
        <div class="mt-2">
            <img src="@/assets/img/avatar.svg">
        </div>
        <div class="font-weight-600 fs-20 mt-3">
            Create your account.
        </div>
        <p class="fs-12">Already have account? <span class="text-blue pointer"
                @click.prevent="$router.push('/auth/login')">Log in</span></p>
                <div class="row mt-5">
      <div class="col">
        <div id="buttonDiv" class="googleresponsive"></div>
      </div>
    </div>
        <ValidationObserver ref="form">
            <form class="mt-3">
                <div class="row">
                    <div class="col-md-7">
                        <label class="form-control-label">First Name</label>
                        <ValidationProviderWrapper :rules="['required']">
                            <input v-model="form.first_name" type="text" class="form-control" placeholder="First Name" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 mt-3">
                        <label class="form-control-label">Last Name</label>
                        <ValidationProviderWrapper :rules="['required']">
                            <input v-model="form.last_name" type="text" class="form-control" placeholder="Last Name" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 mt-3">
                        <label class="form-control-label">Email Address</label>
                        <ValidationProviderWrapper :rules="['email', 'required']">
                            <input v-model="form.email" type="text" class="form-control" placeholder="Sample@mail.com" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 mt-3">
                        <label class="form-control-label">Password</label>
                        <ValidationProviderWrapper :rules="['required']">
                            <BaseInput v-model="form.password" type="password" placeholder="Password" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 fs-12 mt-3">
                        By signing up, you agree to Slate’s <span class="text-blue pointer">Terms of Service and Privacy
                            Policy.</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 my-5">
                        <button class="btn btn-dark font-weight-600 py-2 w-100" :disabled="loading"
                            @click.prevent="handleSubmit">
                            Sign Up <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                terms: true,
            },
            loading: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_CLIENT_ID,
                callback: this.googleLogin,
            })
            google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                {
                    theme: 'outline',
                    size: 'large',
                    width: '320px',
                    text: 'signup_with',
                } // customization attributes
            )
            google.accounts.id.prompt() // also display the One Tap dialog
        })
    },
    methods: {
        async checkFormValidity() {
            const result = await this.$refs.form.validate()
            return result
        },
        async handleSubmit() {
            try {
                const result = await this.checkFormValidity()
                if (!result) {
                    return
                }
                this.loading = true
                const response = await this.$axios.$post('/api-auth/signup/', this.form)
                this.$store.commit('auth/SET_SIGNUP_USER', this.form.email)
                this.$router.push('/auth/verify-account')
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
  </style>