<template>
    <div class="page-wrapper">
        <LayoutNavbar class="site-nav" @show-dropdown="showDropdown" />
        <Nuxt />
        <LayoutFooter v-if="$route.name.split('-').length < 3" />
        <LayoutNavBarDropdown v-if="show" @close-dropdown="closeDropdown" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    watch: {
        '$route'(val) {
            this.show = false
        }
    },
    methods: {
        showDropdown() {
            this.show = !this.show
        },
        closeDropdown () {
            this.show = false
        }
    }
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