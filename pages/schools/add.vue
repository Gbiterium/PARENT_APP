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
        <ValidationObserver ref="form">
        <form class="mt-5">
            <div class="row">
                <div class="col-md-7 mt-3">
                    <label class="form-control-label">School Code</label>
                    <ValidationProviderWrapper :rules="['required']">
                    <input v-model="school_code" type="text" class="form-control" placeholder="_ _ _ _ _ _ _" />
                    </ValidationProviderWrapper>
                </div>
            </div>
            <div class="row">
            <div class="col-md-3 mt-4">
                <button class="btn btn-dark font-weight-600 py-2 w-100" :disabled="loading" @click.prevent="conectSchool">
                    Connect <span
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
export default {
    // middleware: 'route-guard',
    data () {
        return {
            school_code: '',
            loading: false
        }
    },
    methods: {
        async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
        async conectSchool() {
            try {
                const result = await this.checkFormValidity()
            if (!result) {
                return
            }
                this.loading = true
                const str = this.school_code.replace(/\s+/g, "");
      const [schoolcode, linkcode] = str.split("-");
                const response = await this.$axios.post('/util/v2/link/entity/?entity=family', {
                    school_code: schoolcode,
            link_code: linkcode,
                })
                if (response.status === 200) {
                    this.$toast({
                        type: 'success',
                        text: 'Linking was successful'
                    })
                    this.$router.push('/schools')
                }
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