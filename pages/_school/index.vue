<template>
    <div class="container student-lists">
        <!-- <div v-if="loading">
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mb-3" width="100%" height="78px"></b-skeleton>
        </div> -->
        <div class="row">
            <div v-for="el in students" :key="el.id" class="col-md-6 col-lg-4 fs-14 mb-3 schools-container">
                <div class="big-card">
                <div class="card shadow-sm pointer p-3">
                    <div class="d-flex align-items-center" @click.prevent="handleClick(el)">
                        <div class="img-container">
                            <img :src="el.image
                                ? el.image
                                : require(`~/assets/img/${el.gender === 'male' ? 'male' : 'female'
                                    }-young.jpeg`)" alt="avatar" />
                        </div>
                        <div class="d-flex flex-grow-1 justify-content-between ml-2">
                            <div>
                            <div class="fs-18 font-weight-bold">{{ el.name }}</div>
                            <div class="fs-14 font-weight-600">{{ el.class_name }}</div>
                            <div class="fs-14 font-weight-600">{{ el.form_teacher }}</div>
                            </div>
                            <div @click.prevent="handleClick(el)">
                                <img src="@/assets/img/chat2.svg" />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-3">
                        <button class="btn btn-warning px-4 py-2 mr-3 w-50 fs-16 font-weight-600" @click.prevent="goToReport(el)">Reports</button>
                        <button class="btn btn-primary px-4 py-2 w-50 fs-16 font-weight-600" @click.prevent="$router.push('/coming-soon')">Learning</button>
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
    // middleware: 'route-guard',
    data() {
        return {
            // students: [],
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
    // watch: {
    //     school: {
    //         async handler(newval, oldval) {
    //             if (newval && newval !== oldval) {
    //                 const academic_year = newval["current_ academic_year"].year_id
    //                 await this.getStudents(academic_year)
    //             }
    //         },
    //         immediate: true,
    //     },
    // },
    async asyncData({ route, store, $axios }) {

    const school = route.params.school ? store.getters['school/getSchoolByCode'](route.params.school) : null;

    if (school && school['current_ academic_year']) {
      const academicYear = school['current_ academic_year'].year_id;

      try {
        const { data } = await $axios.get(`/communications/v2/family/year/${academicYear}/`);
        const students = data.data.students;
        return {
            students
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
    methods: {
        handleClick(item) {
            this.$router.push({
                path: `/${this.$route.params.school}/${item.class_student_id}`,
                query: {
                    name: item.name,
                    class: item.class_name,
                    form_teacher: item.form_teacher
                }
            })
        },
        goToReport(item) {
            this.$router.push({
                path: `/${this.$route.params.school}/${item.class_student_id}/report-card`,
                query: {
                    name: item.name,
                    class: item.class_name,
                    form_teacher: item.form_teacher
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
.big-card {
    border-radius: 16px;
    background: #e0e0e0;
    height: 168px;
}
</style>