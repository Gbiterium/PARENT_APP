<template>
    <div class="container exercises">
        <div class="toggle d-flex align-items-center fs-14 font-weight-600 pointer">
            <div :class="!toggle ? 'toggled mr-4' : ' flex-grow-1 mx-4'" @click.prevent="notDone">Not Done (10)</div>
            <div :class="toggle ? 'toggled flex-grow-1' : 'flex-grow-0 mx-3'" @click.prevent="submitted">Submitted (50)
            </div>
        </div>
        <div class="mt-3">
            <div v-if="loading">
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="65px"></b-skeleton>
        </div>
            <div v-else class="row pb-4">
                <div v-for="el in exercises" :key="el.id" class="col-md-3 mb-2">
                    <div class="card p-3 shadow-sm">
                        <div class="slate-dark font-weight-600 text-capitalize">{{ el.name }}</div>
                        <div class="fs-12 text-light-blue text-capitalize">{{ el.subject.name }}</div>
                        <div class="d-flex align-items-center justify-content-between">
                        <div class="fs-10"><span class="text-grey">Due: </span><span>{{ formatDate(el.due_date) }}</span></div>
                        <div class="blue-badge fs-10 px-2 py-1 text-capitalize">
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
import { DateTime } from 'luxon'
export default {
    layout: 'parent',
    data() {
        return {
            toggle: false,
            exercises: [],
            loading: false
        }
    },
    watch: {
    '$route': {
      async handler(val) {
        if (this.$route.query.student_id) {
            const status = 'untaken'
          await this.getAssignments(status)
        }
      },
      immediate: true
    }
  },
    methods: {
        async getAssignments(status) {
            try {
                const token = this.$cookies.get('auth-token')
                this.loading = true
                const { data } = await this.$axios.get(`/util/v2/mobile/exercises/${this.$route.query.student_id}?page_size=12&status=${status}`, {
                    headers: {
              Authorization: `Bearer ${token}`,
            },
                })
                this.exercises = data.data.results
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async notDone() {
            this.toggle = false
            const status = 'untaken'
            await this.getAssignments(status)
        },
        async submitted() {
            this.toggle = true
            const status = 'submitted'
            await this.getAssignments(status)
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