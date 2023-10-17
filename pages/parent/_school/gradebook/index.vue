<template>
    <div v-if="$route.query.student_id" class="container" style="padding-top: 4rem;">
        <div class="font-weight-600">Subject ({{ loading ? 0 : subjectNames.length }})</div>
        <div v-if="loading">
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
        </div>
        <div v-else class="row mt-3">
            <div v-for="(el, index) in subjectNames" class="col-md-4 mb-2">
                <div class="card shadow-sm pointer" @click.prevent="handleclick(el, subjects[el].id)">
                    <div class="p-3 d-flex align-items-center justify-content-between">
                        <div class="slate-dark font-weight-600">{{ el }}</div>
                        <div class="fs-14"><span class="text-grey">entries: </span><span class="text-light-blue">{{
                            subjects[el].length }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="subjectNames && subjectNames.length === 0 && !loading" class="no-content">
            <div>
                <div class="d-flex justify-content-center">
            <img src="@/assets/img/empty-list.svg" />
            </div>
            <div class="fs-14 text-black mt-2 text-capitalize">
            no gradebook entry found
          </div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'parent',
    data() {
        return {
            subjects: [],
            subjectNames: [],
            loading: false
        }
    },
    watch: {
    '$route': {
      async handler(val) {
        if (this.$route.query.student_id) {
          await this.getGradebooks()
        }
      },
      immediate: true
    }
  },
    methods: {
        async getGradebooks() {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/util/v2/mobile/gradebooks/${this.$route.query.student_id}/`)
                this.subjects = data.data
                this.subjectNames = Object.keys(this.subjects)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        handleclick(item, index) {
            console.log(index, 'hello')
            this.$router.push(`/parent/${this.$route.params.school}/gradebook/${item}`)
        }
    }
}
</script>

<style scoped>
.no-content {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>