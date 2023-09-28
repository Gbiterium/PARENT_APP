<template>
    <div>
        <div :class="$route.fullPath.includes('communication') ? 'top-nav2' : 'top-nav'">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between py-4 text-white">
                    <div class="d-flex align-items-center">
                        <b-icon-list class="fs-24 pointer" />
                        <div v-if="$route.fullPath.includes('communication')" class="ml-3 fs-20 font-weight-600">
                                Communication
                            </div>
                        <div v-else class="ml-3">
                            <div class="fs-12 font-weight-light">Welcome back</div>
                            <div class="fs-20 font-weight-600">
                                Yemi Oluwalaren
                            </div>
                        </div>
                    </div>
                    <div :class="$route.fullPath.includes('communication') ? 'small-container' : 'img-container'">
                        <img v-if="$route.fullPath.includes('communication')" class="pointer" src="@/assets/img/house.svg" @click.prevent="$router.push('/parent')" />
                        <img src="@/assets/img/default_profile.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.top-nav {
   position: fixed;
    height: auto;
    width: 100%;
    background: url('@/assets/img/bgimg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.top-nav2 {
   position: fixed;
    height: auto;
    width: 100%;
    background: #1C7ADC;
}
.img-container img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.small-container img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
</style>