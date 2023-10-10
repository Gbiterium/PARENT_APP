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
        <p class="fs-12">Already have account? <span class="text-blue pointer" @click.prevent="$router.push('/auth/login')">Log in</span></p>
        <form class="mt-5">
            <div class="row">
                <div class="col-md-7">
                    <label class="form-control-label">First Name</label>
                    <input type="text" class="form-control" placeholder="First Name" />
                </div>
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Last Name</label>
                    <input type="text" class="form-control" placeholder="Last Name" />
                </div>
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Email Address</label>
                    <input type="text" class="form-control" placeholder="Sample@mail.com" />
                </div>
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Password" />
                </div>
                <div class="col-md-7 fs-12 mt-3">
                    By signing up, you agree to Slate’s <span class="text-blue pointer">Terms of Service and Privacy Policy.</span>
                </div>
            </div>
            <div class="row">
            <div class="col-md-3 my-5">
                <button class="btn btn-dark font-weight-600 py-2 w-100">
    Sign Up
  </button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
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
            width: '400px',
            text: 'signup_with',
          } // customization attributes
        )
        google.accounts.id.prompt() // also display the One Tap dialog
      })
    },
}
</script>

<style scoped>

</style>