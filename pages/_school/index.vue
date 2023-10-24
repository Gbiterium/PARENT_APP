<template>
    <div class="container student-lists">
        <div v-if="loading">
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
        </div>
        <div v-else class="row">
            <div v-for="el in students" :key="el.id" class="col-md-4 fs-14 mb-3 schools-container">
                <div class="card shadow-sm pointer p-3" @click.prevent="handleClick(el)">
                    <div class="d-flex align-items-center">
                        <div class="img-container">
                            <img :src="el.image
                                ? el.image
                                : require(`~/assets/img/${el.gender === 'male' ? 'male' : 'female'
                                    }-young.jpeg`)" alt="avatar" />
                        </div>
                        <div class="d-flex flex-grow-1 justify-content-between ml-2">
                            <div>
                            <div class="fs-18 font-weight-bold">{{ el.name }}</div>
                            <div class="fs-14 font-weight-medium">{{ el.class_name }}</div>
                            <div class="fs-14 font-weight-medium">{{ el.form_teacher }}</div>
                            </div>
                            <div @click.prevent="handleClick(el)">
                                <img src="@/assets/img/chat2.svg" />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-3">
                        <button class="btn btn-warning px-4 py-2 mr-3 w-50 fs-16 font-weight-600">Reports</button>
                        <button class="btn btn-primary px-4 py-2 w-50 fs-16 font-weight-600">Learning</button>
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
            students: [],
            loading: false
        }
    },
    computed: {
        school() {
            if (this.$route.params.school) {
                return this.$store.getters["school/getSchoolByCode"](this.$route.params.school);
            } else {
                return
            }
        },
    },
    watch: {
        school: {
            async handler(newval, oldval) {
                if (newval && newval !== oldval) {
                    const academic_year = newval["current_ academic_year"].year_id
                    await this.getStudents(academic_year)
                }
            },
            immediate: true,
        },
    },
    methods: {
        async getStudents(id) {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/communications/v2/family/year/${id}/`)
                this.students = data.data.students
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        handleClick(item) {
            this.$router.push({
                path: `/${this.$route.params.school}/${item.class_student_id}`,
                query: {
                    name: item.name
                }
            })
        }
    }
}
</script>

<style scoped>
.img-container img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
button {
    border-radius: 100px;
}
.student-lists {
    margin-bottom: 100px;
}
</style>