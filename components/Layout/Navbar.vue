<template>
    <div>
        <div :class="pageRoutes.length > 2 && pageRoutes[2] !== '' ? 'top-nav2 pt-4' : 'top-nav py-4'">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between text-light-blue">
                    <div class="d-flex align-items-center">
                        <b-icon-list class="fs-24 pointer" />
                        <div v-if="pageRoutes.length > 2 && pageRoutes[2] !== ''" class="ml-2 fs-20 font-weight-600 text-capitalize">
                            {{ pageName.includes('-') ? pageName.replace(/-/g, " ") : pageName }}
                        </div>
                        <div v-else class="ml-3">
                            <div class="fs-12 font-weight-light">Welcome back</div>
                            <div class="fs-20 font-weight-600">
                                Yemi Oluwalaren
                            </div>
                            <div v-if="$route.fullPath.includes('parent')" class="fs-14 font-weight-medium">Slate International School</div>
                        </div>
                    </div>
                    <div :class="pageRoutes.length > 2 && pageRoutes[2] !== '' ? 'small-container' : 'img-container'">
                        <img v-if="pageRoutes.length > 2 && pageRoutes[2] !== ''" class="pointer mr-2" src="@/assets/img/house.svg"
                            @click.prevent="$router.push('/parent')" />
                        <img src="@/assets/img/default_profile.png" />
                    </div>
                </div>
                <div v-if="pageRoutes.length > 2 && pageRoutes[2] !== ''" class="my-3 d-flex align-items-center pointer">
                    <div v-for="(el, index) in students" :key="index" class="mr-2" @click.prevent="handleClick(el, index)">
                        <div class="d-flex align-items-center p-1"
                            :class="selectedIndex === index ? 'selected' : 'not-selected'">
                            <img :src="el.image" alt="avatar" />
                            <div class="text-white ml-2">
                                <div class="fs-10 font-weight-medium">{{ el.name }}</div>
                                <div class="fs-10">{{ el.class }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageRoutes: [],
            pageName: '',
            students: [
                { name: 'Rita Andrew', class: 'SSS II', image: require('@/assets/img/Image.png') },
                { name: 'Divine Andrew', class: 'JSS III', image: require('@/assets/img/Image.png') },
            ],
            selectedIndex: 0,
        }
    },
    watch: {
        '$route.path': {
            handler(val) {
                this.pageRoutes = val.split('/')
                this.pageName = this.pageRoutes[2]
            },
            immediate: true
        }
    },
    methods: {
        handleClick(item, index) {
            this.selectedIndex = index;
        }
    }
}
</script>

<style scoped>
.top-nav {
    position: fixed;
    height: auto;
    width: 100%;
    /* background: url('@/assets/img/bgimg.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 1001;
}

.top-nav2 {
    position: fixed;
    height: auto;
    width: 100%;
    /* background: #1C7ADC; */
    z-index: 1001;
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

.selected {
    border-radius: 8px;
    border: 1px solid #FFF;
    background: #0A4C90;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.20);
    width: 120px;
}

.not-selected {
    border-radius: 8px;
    background: #0A4C90;
    width: 120px;
    opacity: 0.5;
}</style>