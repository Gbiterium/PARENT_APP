<template>
    <div class="container mt-5">
        <div class="row">
        <div v-for="(el, index) in reports" :key="index" class="col-md-4 mb-2">
            <div class="card">
                <div class="m-3">
                    <div class="fs-14 slate-dark font-weight-600">{{ el.name }}</div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="fs-12"><span class="text-grey">Uploaded on: </span><span class="text-blue">{{ el.created_at }}</span></div>
                        <div class="icon-wrapper d-flex justify-content-center align-items-center pointer">
                            <b-icon-download class="text-blue fs-20" />
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
    layout: 'parent',
    data() {
        return {
            reports: [
                {name: '1st Term Mid-Week Report Card', created_at: '12/11/2021'},
                {name: '1st Term Mid-Week Report Card', created_at: '12/11/2021'},
                {name: '1st Term Mid-Week Report Card', created_at: '12/11/2021'},
                {name: '1st Term Mid-Week Report Card', created_at: '12/11/2021'},
            ]
        }
    }
}
</script>

<style  scoped>
.icon-wrapper {
    border-radius: 50%;
    border: 0.5px solid #D8EDF5;
    width: 36px;
    height: 36px;
}
.card {
    border: 0.5px solid #D8EDF5;
    border-radius: 16px;
    background: #fff;
}
</style>