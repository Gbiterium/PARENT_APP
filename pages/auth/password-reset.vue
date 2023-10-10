<template>
    <div class="container">
        <div class="py-4 pointer">
            <b-icon-chevron-left class="fs-24" @click.prevent="$router.go(-1)" />
        </div>
        <div class="mt-2">
            <img src="@/assets/img/paddlock.svg">
        </div>
        <div class="font-weight-600 fs-20 mt-3">
            Forgot Password
        </div>
        <ValidationObserver ref="form">
            <form class="mt-5">
                <div class="row">
                    <div class="col-md-7 mt-3">
                        <label class="form-control-label">Email Address</label>
                        <ValidationProviderWrapper :rules="['email', 'required']">
                            <input v-model="email" type="text" class="form-control" placeholder="Sample@mail.com" />
                        </ValidationProviderWrapper>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mt-4">
                        <button class="btn btn-dark font-weight-600 py-2 w-100" :disabled="loading"
                            @click.prevent="submitForm">
                            Reset Password <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
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
            email: '',
            loading: false
        }
    },
    methods: {
        async checkFormValidity() {
            const result = await this.$refs.form.validate()
            return result
        },
        async submitForm() {
            try {
                const result = await this.checkFormValidity()
                if (!result) {
                    return
                }
                this.loading = true
                await this.$axios.$put(`/api-auth/password/reset/?email=${this.email}`)
                this.$toast({
                    text: 'Check your email for a password reset link.',
                    type: 'success'
                })
                this.$router.push('/auth/password-recovery')
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped></style>