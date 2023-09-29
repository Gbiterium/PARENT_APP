<template>
    <div class="container">
        <div class="d-flex align-items-center text-blue pointer" @click.prevent="$router.push('/schools/add')">
            <b-icon-plus class="fs-20" />
            <div class="text-capitalize fs-14">connect your child school</div>
        </div>
        <div class="font-weight-600 fs-14 mt-3 schools-container">
            <div class="p-3" @click.prevent="$router.push('/parent')">
            Slate International School
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'parent'
}
</script>

<style scoped>
.schools-container {
    border-top: 0.5px solid #D8EDF5;
    border-bottom: 0.5px solid #D8EDF5;
}
</style>