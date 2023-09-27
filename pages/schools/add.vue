<template>
    <div class="container">
        <div class="py-4 pointer">
            <b-icon-chevron-left class="fs-24" @click.prevent="$router.go(-1)" />
        </div>
        <div class="mt-2 icon-container d-flex justify-content-center align-items-center">
            <img src="@/assets/img/link.svg">
        </div>
        <div class="font-weight-600 fs-20 mt-3">
            Connect to your child’s school.
        </div>
        <form class="mt-5">
            <div class="row">
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">School Code</label>
                    <input type="text" class="form-control" placeholder="_ _ _ _ _ _ _" />
                </div>
            </div>
            <div class="row">
            <div class="col-md-3 mt-4">
                <button class="btn btn-dark font-weight-600 py-2 w-100">
                    Connect
  </button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>

</script>

<style scoped>

</style>