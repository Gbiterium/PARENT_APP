<template>
    <div class="container">
        <div class="py-4 pointer">
            <b-icon-chevron-left class="fs-24" @click.prevent="$router.go(-1)" />
        </div>
        <div class="mt-2 icon-container d-flex justify-content-center align-items-center">
            <img src="@/assets/img/login.svg" width="36" height="36">
        </div>
        <div class="font-weight-600 fs-20 mt-3">
            Log in to your account.
        </div>
        <p class="fs-12">Don’t have an account? <span class="text-blue pointer"
                @click.prevent="$router.push('/auth/signup')">Sign Up</span></p>
                <div class="row mt-5">
      <div class="col">
        <div id="buttonDiv" class="googleresponsive"></div>
      </div>
    </div>
        <ValidationObserver ref="form">
            <form class="">
                <div class="row">
                    <div class="col-md-7 mt-3">
                        <ValidationProviderWrapper :rules="['email', 'required']">
                            <label class="form-control-label">Email Address</label>
                            <input v-model="email" type="text" class="form-control" placeholder="Sample@mail.com" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 mt-3">
                        <ValidationProviderWrapper :rules="['required']">
                            <label class="form-control-label">Password</label>
                            <BaseInput v-model="password" type="password" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-7 fs-12 mt-3">
                        <div class="d-flex justify-content-between align-items-center fs-12">
                            <div class="d-flex align-items-center">
                                <b-form-checkbox id="checkbox-1" class="custom-checkbox" v-model="status" name="checkbox-1"
                                    value="accepted" unchecked-value="not_accepted">
                                </b-form-checkbox>
                                <div>Remember my account</div>
                            </div>
                            <div class="text-blue pointer" @click.prevent="$router.push('/auth/password-reset')">
                                Forgot Password?
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mt-5">
                        <button class="btn btn-dark font-weight-600 py-2 w-100" @click.prevent="submitForm" :disabled="loading">
                            Log in <span
        v-if="loading"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
                        </button>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            email: '',
            password: '',
            loading: false
        }
    },
    mounted() {
        this.$nextTick(() => {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: this.googleLogin,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: "large",
          width: "320px",
          text: "signin_with",
          logo_alignment: "center",
        } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    });
  },
  methods: {
    ...mapActions('auth', ['LOGIN']),
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
        await this.LOGIN({
          username: this.email,
          password: this.password,
        });
        this.$router.push('/schools')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.$router.push('/auth/verify-account')
        }
      } finally {
        this.loading = false
      }
    },
    async googleLogin(response) {
      try {
        const data = await this.$axios.$post("/api-auth/login/google/", {
          id_token: response.credential,
        });
        this.$store.commit("auth/SET_USER", data.data.user_details);
        this.$store.commit("auth/SET_TOKEN", data.data.token);
        this.$cookies.set('auth-token', data.data.token)
        this.$router.push('/schools')
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped></style>