<template>
    <div class="container mt-5">
        <div class="font-weight-600">Subject (8)</div>
        <div class="row mt-3">
            <div v-for="(el, index) in subjects" class="col-md-4 mb-2">
                <div class="card shadow-sm pointer" @click.prevent="handleclick(el, index)">
                    <div class="p-3 d-flex align-items-center justify-content-between">
                        <div class="slate-dark font-weight-600">{{ el.name }}</div>
                        <div class="fs-14"><span class="text-grey">entries: </span><span class="text-light-blue">{{
                            el.entries }}</span></div>
                    </div>
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
            subjects: [
                { name: 'Mathematics', entries: '18' },
                { name: 'English Language', entries: '20' },
                { name: 'Biology', entries: '12' },
            ]
        }
    },
    methods: {
        handleclick(itme, index) {
            this.$router.push(`/parent/${this.$route.params.school}/gradebook/${index}`)
        }
    }
}
</script>

<style scoped>

</style>