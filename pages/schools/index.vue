<template>
    <div class="container">
        <div v-if="loading">
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
        </div>
        <div v-else class="row">
        <div v-for="school in getSchools" :key="school.id" class="col-md-4 font-weight-600 mb-3 schools-container">
            <div class="card pointer shadow-sm p-3" @click.prevent="$router.push(`/${school.code}`)">
                <div class="d-flex align-items-center">
                    <img :src="school.image" />
                    <div class="ml-3">{{ school.name }}</div>
                </div>
            </div>
        </div>
        </div>
        <div v-if="!loading" class="d-flex align-items-center text-light-blue pointer" @click.prevent="$router.push('/schools/add')">
            <div class="icon-wrapper d-flex justify-content-center align-items-center">
                <div class="d-flex justify-content-center align-items-center">
            <b-icon-plus-lg class="fs-16 font-weight-bold" />
            </div>
            </div>
            <div class="ml-2 font-weight-600">Add child(ren) Sch</div>
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
.icon-wrapper {
    border: 1.5px solid #1C7ADC;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
</style>