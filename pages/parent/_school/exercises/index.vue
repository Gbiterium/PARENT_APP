<template>
    <div class="container exercises">
        <div class="toggle d-flex align-items-center fs-14 font-weight-600 pointer">
            <div :class="!toggle ? 'toggled mr-4' : ' flex-grow-1 mx-4'" @click.prevent="getPending">Not Done ({{ notDone
            }})</div>
            <div :class="toggle ? 'toggled flex-grow-1' : 'flex-grow-0 mx-3'" @click.prevent="getSubmitted">Submitted ({{
                submitted }})
            </div>
        </div>
        <div class="mt-3">
            <div v-if="loading">
                <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
                <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
                <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
            </div>
            <div v-else class="row">
                <div v-for="el in exercises" :key="el.id" class="col-md-3 mb-2">
                    <div class="card p-3 shadow-sm">
                        <div class="slate-dark font-weight-600 text-capitalize">{{ el.name }}</div>
                        <div class="fs-12 text-light-blue text-capitalize">{{ el.subject.name }}</div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="fs-10"><span class="text-grey">Due: </span><span>{{ formatDate(el.due_date)
                            }}</span></div>
                            <div class="blue-badge fs-10 px-2 py-1 text-capitalize">
                                {{ el.type }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!loading" class="mt-3 mb-4 d-flex align-items-center justify-content-end">
                <div class="mr-3">
                    <div v-if="!loading" class="text-light-blue fs-14 mt-1">
                        {{ showFrom }}-{{ showTo }} of {{ totalRecords }}
                    </div>
                </div>
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm"
                    class="my-0"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
    layout: 'parent',
    data() {
        return {
            toggle: false,
            exercises: [],
            loading: false,
            notDone: 0,
            submitted: 0,
            currentPage: 1,
            recordCount: 0,
            pages: 1,
            page: 1,
            perPage: 12,
            status: ''
        }
    },
    watch: {
        '$route': {
            async handler(val) {
                if (this.$route.query.student_id) {
                    this.status = 'untaken'
                    await this.getAssignments(this.status, 1)
                }
            },
            immediate: true
        },
        async currentPage() {
            if (this.currentPage === 0) return
            await this.getAssignments(this.status, this.currentPage)
        },
    },
    computed: {
        totalRows() {
            return this.pages * this.perPage
        },
        showFrom() {
            return (this.currentPage - 1) * this.perPage + 1
        },
        showTo() {
            if (parseInt(this.showFrom) + parseInt(this.perPage) > this.recordCount) {
                return this.recordCount ? this.recordCount : 'Max'
            } else if (parseInt(this.currentPage) === 1) {
                return parseInt(this.perPage)
            } else {
                return parseInt(this.showFrom) + parseInt(this.perPage)
            }
        },
        totalRecords() {
            if (parseInt(this.showFrom) + parseInt(this.perPage) > this.recordCount) {
                return this.recordCount ? this.recordCount : 'Max'
            } else if (this.recordCount) {
                return parseInt(this.recordCount)
            } else {
                return parseInt(this.totalRows)
            }
        },
    },
    async created() {
        await this.getStats()
    },
    methods: {
        async getStats() {
            try {
                const { data } = await this.$axios.get(`/util/v2/mobile/exercises/${this.$route.query.student_id}/stat/`)
                this.notDone = data.data.pending_exercises + data.data.due_exercises
                this.submitted = data.data.exercises - this.notDone
            } catch (error) {
                console.log(error)
            }
        },
        async getAssignments(status, i = 1) {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/util/v2/mobile/exercises/${this.$route.query.student_id}/?page_size=${this.perPage}&page=${1}&status=${status}`)
                this.exercises = data.data.results
                this.pages = data.data.total_pages
                this.recordCount = data.data.count
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async getPending() {
            this.toggle = false
            this.status = 'untaken'
            await this.getAssignments(this.status, 1)
        },
        async getSubmitted() {
            this.toggle = true
            this.status = 'taken'
            await this.getAssignments(this.status, 1)
        },
        formatDate(date) {
            const dt = DateTime.fromISO(date)
            return dt.toFormat("dd/MM/yyyy")
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