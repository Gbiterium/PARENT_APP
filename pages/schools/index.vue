<template>
    <div class="container">
        <div v-if="loading">
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
        </div>
        <div v-else class="row">
        <div v-for="school in getSchools" :key="school.id" class="col-md-4 font-weight-600 fs-14 mb-3 schools-container">
            <div class="card pointer p-3" @click.prevent="$router.push(`/${school.code}`)">
                <div class="d-flex align-items-center">
                    <img :src="school.image" />
                    <div class="text-blue ml-3">{{ school.name }}</div>
                </div>
            </div>
        </div>
        </div>
        <div v-if="!loading" class="d-flex align-items-center text-blue pointer" @click.prevent="$router.push('/schools/add')">
            <b-icon-plus class="fs-20" />
            <div class="text-capitalize fs-14">Add School</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    layout: 'parent',
    // middleware: 'route-guard',
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters('school', ['getSchools'])
    },
    async created () {
        this.loading = true
        await this.GET_SCHOOLS()
        this.loading = false
    },
    methods: {
        ...mapActions('school', ['GET_SCHOOLS']) 
    }
}
</script>

<style scoped>
.schools-container img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
</style>