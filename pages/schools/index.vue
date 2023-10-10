<template>
    <div class="container">
        <div class="d-flex align-items-center text-blue pointer" @click.prevent="$router.push('/schools/add')">
            <b-icon-plus class="fs-20" />
            <div class="text-capitalize fs-14">connect your child school</div>
        </div>
        <div class="row">
        <div v-for="school in getSchools" :key="school.id" class="col-md-4 font-weight-600 fs-14 mt-3 schools-container">
            <div class="card pointer p-3" @click.prevent="$router.push(`/parent/${school.code}`)">
                <div class="d-flex align-items-center">
                    <img :src="school.image" />
                    <div class="text-blue ml-3">{{ school.name }}</div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    layout: 'parent',
    computed: {
        ...mapGetters('school', ['getSchools'])
    },
    async created () {
        await this.GET_SCHOOLS()
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
}
</style>