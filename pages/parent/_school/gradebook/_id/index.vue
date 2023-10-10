<template>
    <div class="container" style="padding-top: 4rem;">
        <div class="font-weight-600">Entries (8)</div>
        <div class="card p-3 mt-3">
        <div v-for="(el, index) in grades" :key="index">
        <div class="border-bottom py-2 pointer" @click.prevent="handleClick(el, index)">
            <div class="d-flex justify-content-between">
            <div class="font-weight-medium slate-dark fs-14">{{ el.name }}</div>
            <div>
                <div class="fs-14 text-light-blue">{{ el.score }}</div>
                <div class="fs-12 text-grey">{{ el.term }}</div>
            </div>
            </div>
            <div v-if="selectedIndex === index" class="comment-wrapper p-2 mt-2">
            <div class="fs-12">{{ el.comment }}</div>
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
            grades: [
                {name: 'Classwork', score: '3 / 10', comment: 'You need to pay attention in class.', term: '1st term'},
                {name: 'Classwork', score: '3 / 10', comment: 'You need to pay attention in class.', term: '1st term'},
                {name: 'Homework', score: '8 / 10', comment: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.', term: '1st term'},
                {name: 'Classwork', score: '3 / 10', comment: 'You need to pay attention in class.', term: '1st term'},
            ],
            selectedIndex: null,
        }
    },
    methods: {
        handleClick(item, index) {
            this.selectedIndex = index
        }
    }
}
</script>

<style scoped>
.border-bottom {
    border-bottom: 0.5px solid #D8EDF5 !important;
}
.comment-wrapper {
    border-radius: 4px;
border: 0.5px solid #D8EDF5;
background: #FBFDFE; 
}
</style>