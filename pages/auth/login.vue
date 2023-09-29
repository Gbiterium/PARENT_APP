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
        <p class="fs-12">Don’t have an account? <span class="text-blue pointer" @click.prevent="$router.push('/auth/signup')">Sign Up</span></p>
        <form class="mt-5">
            <div class="row">
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Email Address</label>
                    <input type="text" class="form-control" placeholder="Sample@mail.com" />
                </div>
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Password" />
                </div>
                <div class="col-md-7 fs-12 mt-3">
                    <div class="d-flex justify-content-between align-items-center fs-12">
                        <div class="d-flex align-items-center">
                        <b-form-checkbox
      id="checkbox-1"
      class="custom-checkbox"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
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
                <button class="btn btn-dark font-weight-600 py-2 w-100" @click.prevent="$router.push('/schools')">
                    Log in
  </button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
      return {
        status: 'not_accepted'
      }
    }
}
</script>

<style scoped>

</style>