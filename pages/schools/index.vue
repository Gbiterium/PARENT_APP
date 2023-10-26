<template>
    <div class="container">
        <div v-if="loading">
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
        </div>
        <div v-else class="row">
        <div v-for="school in getSchools" :key="school.id" class="col-md-4 font-weight-bold mb-3 schools-container">
            <div class="big-card">
            <div class="card pointer shadow-sm p-3" @click.prevent="$router.push(`/${school.code}`)">
                <div class="d-flex align-items-center">
                    <img :src="school.image" />
                    <div class="ml-3 fs-18">{{ school.name }}</div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div v-if="!loading" class="d-flex align-items-center text-light-blue pointer" @click.prevent="$router.push('/schools/add')">
            <div class="icon-wrapper d-flex justify-content-center align-items-center">
                <div class="d-flex justify-content-center align-items-center">
            <img src="@/assets/img/plus.svg" />
            </div>
            </div>
            <div class="ml-2 font-weight-bold fs-20">Add Child(ren)</div>
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
    min-width: 45px;
    height: 45px;
    /* border-radius: 50%; */
}
.icon-wrapper {
    border: 3px solid #1C7ADC;
    border-radius: 50%;
    width: 75px;
    height: 75px;
}
.big-card {
    border-radius: 16px;
    background: #dadada;
    height: 85px;
}
</style>