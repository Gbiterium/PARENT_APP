<template>
    <div class="page-wrapper">
        <LayoutNavbar class="site-nav" />
        <Nuxt />
        <LayoutFooter v-if="$route.name.split('-').length < 3" />
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.site-nav {
    padding-bottom: 110px;
}
.page-wrapper {
    background: #F5F9FA;
    min-height: 100vh;
}
</style>