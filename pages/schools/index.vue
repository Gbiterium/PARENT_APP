<template>
    <div class="container">
        <div class="d-flex align-items-center text-blue pointer" @click.prevent="$router.push('/schools/add')">
            <b-icon-plus class="fs-20" />
            <div class="text-capitalize fs-14">connect your child school</div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'parent'
}
</script>

<style scoped>

</style>