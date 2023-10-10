<template>
    <div class="page-wrapper">
        <LayoutNavbar class="site-nav" />
        <Nuxt />
        <LayoutFooter v-if="pageRoutes.length < 4" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageRoutes: []
        };
    },
    watch: {
        '$route.path': {
            handler(val) {
                this.pageRoutes = val.split('/')
            },
            immediate: true
        }
    },
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