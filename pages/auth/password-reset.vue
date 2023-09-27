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
        <form class="mt-5">
            <div class="row">
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">Email Address</label>
                    <input type="text" class="form-control" placeholder="Sample@mail.com" />
                </div>
            </div>
            <div class="row">
            <div class="col-md-3 mt-4">
                <button class="btn btn-dark font-weight-600 py-2 w-100">
                    Reset Password
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