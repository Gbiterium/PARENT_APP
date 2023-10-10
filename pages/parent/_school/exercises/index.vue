<template>
    <div class="container exercises">
        <div class="toggle d-flex align-items-center fs-14 font-weight-600 pointer">
            <div :class="!toggle ? 'toggled mr-4' : ' flex-grow-1 mx-4'" @click.prevent="notDone">Not Done (10)</div>
            <div :class="toggle ? 'toggled flex-grow-1' : 'flex-grow-0 mx-3'" @click.prevent="submitted">Submitted (50)
            </div>
        </div>
        <div class="mt-3">
            <div class="row">
                <div v-for="(el, index) in exercises" :key="index" class="col-md-3 mb-2">
                    <div class="card p-3 shadow-sm">
                        <div class="slate-dark font-weight-600">{{ el.title }}</div>
                        <div class="fs-12 text-light-blue">{{ el.subject }}</div>
                        <div class="d-flex align-items-center justify-content-between">
                        <div class="fs-10"><span class="text-grey">Due: </span><span>{{ el.due_date }}</span></div>
                        <div class="blue-badge fs-10 px-2 py-1">
                            {{ el.type }}
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
            toggle: false,
            exercises: [
                { title: 'Addition and Subtraction Quiz', subject: 'Mathematics', due_date: '20/11/2021', type: 'Homework' },
                { title: 'Hamilton Essay', subject: 'English Language', due_date: '20/11/2021', type: 'Classwork' },
                { title: 'Addition and Subtraction Quiz', subject: 'Mathematics', due_date: '20/11/2021', type: 'Homework' },
                { title: 'Addition and Subtraction Quiz', subject: 'Mathematics', due_date: '20/11/2021', type: 'Homework' },
            ]
        }
    },
    methods: {
        notDone() {
            this.toggle = false
        },
        submitted() {
            this.toggle = true
        }
    }
}
</script>

<style scoped>
.toggle {
    height: 32px;
    width: 100%;
    border: 0.5px solid #D8EDF5;
    border-radius: 12px;
    background: #F3FAFC;
}
.exercises {
    padding-top: 4rem;
}
.toggled {
    background: #fff;
    color: #1C7ADC;
    height: 32px;
    width: 50%;
    border: 0.5px solid #1C7ADC;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>