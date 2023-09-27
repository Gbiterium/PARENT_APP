<template>
    <div>
        <div class="top-nav">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between py-4 text-white">
                    <div class="d-flex align-items-center">
                        <b-icon-list class="fs-24 pointer" />
                        <div class="ml-3">
                            <div class="fs-12 font-weight-light">Welcome back</div>
                            <div class="fs-20 font-weight-600">
                                Yemi Oluwalaren
                            </div>
                        </div>
                    </div>
                    <div class="img-container">
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
    background-image: url('@/assets/img/bgimg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.img-container img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
</style>