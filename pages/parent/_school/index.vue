<template>
    <div class="container parent-menu mt-3">
        <div class="row">
            <div v-for="(el, index) in menus" :key="index" class="col-6 col-md-4 mt-3 pointer">
                <div class="menu p-3" :style="{ background: el.background, borderBottom: `2px solid ${el.color}`}" @click.prevent="$router.push(el.route)">
                    <div :class="el.name === 'Communication' ? 'icon-bg' : ''">
                    <img :src="el.icon" />
                    </div>
                    <div class="font-weight-medium fs-14 mt-4">{{ el.name }}</div>
                    <div class="text-lighter fs-10">{{ el.summary }}</div>
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
            menus: [
                { name: 'Communication', summary: '5 unread', icon: require('@/assets/img/communication.svg'), color: '#F77664', background: 'linear-gradient(227deg, rgba(247, 118, 100, 0.15) -55.59%, rgba(247, 118, 100, 0.00) 94.23%)', route: `/parent/${this.$route.params.school}/communication` },
                { name: 'Report Card', summary: '20 Files', icon: require('@/assets/img/report.svg'), color: '#649FF7', background: 'linear-gradient(227deg, rgba(100, 159, 247, 0.18) -55.59%, rgba(100, 159, 247, 0.00) 94.23%)', route: `/parent/${this.$route.params.school}/report-card` },
                { name: 'Exercises', summary: '28 Undone', icon: require('@/assets/img/book.svg'), color: '#5B5DE9', background: 'linear-gradient(227deg, rgba(91, 93, 233, 0.15) -55.59%, rgba(91, 93, 233, 0.00) 94.23%)', route: `/parent/${this.$route.params.school}/exercises` },
                { name: 'Finance', summary: '3 Open Invoice', icon: require('@/assets/img/finance.svg'), color: '#FFD057', background: 'linear-gradient(227deg, rgba(255, 208, 87, 0.15) -55.59%, rgba(255, 208, 87, 0.00) 94.23%)', route: `/parent/${this.$route.params.school}` },
                { name: 'Gradebook', summary: '40 Entries', icon: require('@/assets/img/gradebook.svg'), color: '#D357FF', background: 'linear-gradient(227deg, rgba(211, 87, 255, 0.15) -55.59%, rgba(211, 87, 255, 0.00) 94.23%)', route: `/parent/${this.$route.params.school}/gradebook` },
                { name: 'Attendance', summary: 'View Details', icon: require('@/assets/img/attendance.svg'), color: '#FF5789', background: 'linear-gradient(227deg, rgba(255, 87, 137, 0.15) -55.59%, rgba(255, 87, 137, 0.00) 94.23%)', route: `/parent${this.$route.params.school}` },
            ]
        }
    }
}
</script>

<style scoped>
.menu {
    border-radius: 16px;
    box-shadow: 0px 2px 8px 0px rgba(2, 65, 111, 0.05);
}
.icon-bg {
    width: 45px;
height: 45px; 
border-radius: 8px;
background: #F77664; 
display: flex;
align-items: center;
justify-content: center;
}
.parent-menu {
    overflow: auto;
}
</style>