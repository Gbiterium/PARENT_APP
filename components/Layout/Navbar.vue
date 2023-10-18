<template>
    <div>
        <div :class="pageRoute.length > 2 ? 'top-nav2 py-4' : 'top-nav py-4'">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between text-light-blue">
                    <div class="d-flex align-items-center">
                        <b-icon-bell-fill v-if="$route.name.includes('schools')" class="pointer fs-20 ml-2" />
                        <b-icon-chevron-left v-else class="fs-20 ml-2 pointer" @click.prevent="pageRoute.length === 3 ? $router.push(`/parent/${school.code}`) : $router.go(-1)" />
                    </div>
                    <div v-if="pageRoute.length > 2" class="fs-20 font-weight-600 text-capitalize">
                        {{ pageRoute[2].includes('-') ? pageRoute[2].replace(/-/g, ' ') : pageRoute[2] }}
                    </div>
                    <div v-else class="">
                        <div v-if="$route.fullPath.includes('schools')" class="fs-12 font-weight-light">Welcome back</div>
                        <div v-if="getUser && $route.fullPath.includes('schools')" class="fs-20 font-weight-600">
                            {{ getUser.first_name }} {{ getUser.last_name }}
                        </div>
                        <div v-if="$route.fullPath.includes('parent') && school" class="fs-18 font-weight-medium">{{
                            school.name }}</div>
                    </div>
                    <div class="pointer d-flex align-items-center">
                        <img v-if="pageRoute.length > 2" class="pointer mr-2"
                            src="@/assets/img/house.svg" @click.prevent="$router.push(`/parent/${school.code}`)" />
                        <!-- <b-dropdown variant="link" toggle-class="custom-toggle text-decoration-none" no-caret>
                            <template #button-content>
                                <b-icon-gear-fill class="text-light-blue" />
                            </template>
                            <b-dropdown-item class="fs-14" href="#">My Profile</b-dropdown-item>
                            <b-dropdown-item href="#"><button class="btn btn-danger" @click="logout()">Log out
                                </button></b-dropdown-item>
                        </b-dropdown> -->
                        <!-- <img src="@/assets/img/default_profile.png" /> -->
                        <b-icon-gear-fill class="text-light-blue fs-20 mr-3" @click.prevent="$emit('show-dropdown')" />
                    </div>
                </div>
                <div v-if="pageRoute.length === 3"
                    class="students mt-3 d-flex align-items-center pointer">
                    <div v-if="loading" class="d-flex">
                        <b-skeleton class="mr-3" width="150px" height="58px"></b-skeleton>
                        <b-skeleton class="mr-2" width="150px" height="58px"></b-skeleton>
                    </div>
                    <div v-else v-for="(el, index) in students" :key="index" class="mr-2"
                        @click.prevent="handleClick(el, index)">
                        <div class="d-flex align-items-center p-1 small-container"
                            :class="selectedIndex === index ? 'selected' : 'not-selected'">
                            <img :src="el.image
                                ? el.image
                                : require(`~/assets/img/${el.gender === 'male' ? 'male' : 'female'
                                    }-young.jpeg`)" alt="avatar" />
                            <div class="text-white ml-2">
                                <div class="fs-11 font-weight-medium">{{ el.name.split(" ").slice(0, 2).join(" ") }}</div>
                                <div class="fs-11 font-weight-medium">{{ el.name.split(" ")[2] }}</div>
                                <div class="fs-10">{{ el.class_name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            pageRoutes: [],
            pageName: '',
            students: [
            ],
            selectedIndex: 0,
            selectedStudent: {},
            loading: false,
            show: false
        }
    },
    computed: {
        ...mapGetters('auth', ['getUser']),
        school() {
            if (this.$route.params.school) {
                return this.$store.getters["school/getSchoolByCode"](this.$route.params.school);
            } else {
                return
            }
        },
        pageRoute() {
            const route = this.$route.path.split('/')
            return route.filter((el) => el !== "")
        }
    },
    watch: {
        school: {
            async handler(newval, oldval) {
                if (newval && newval !== oldval) {
                    const academic_year = newval["current_ academic_year"].year_id
                    await this.getStudents(academic_year)
                }
                    if (Object.keys(this.selectedStudent).length === 0 && this.pageRoute.length === 3) {
          if (this.students.length > 0) {
            this.selectedStudent = this.students[0];
            this.$router.push({
              query: {
                admission_id: this.selectedStudent.admission_id,
                student_id: this.selectedStudent.class_student_id
              }
            });
          }
        } if (this.pageRoute.length === 3) {
          this.$router.push({
            query: {
              admission_id: this.selectedStudent.admission_id,
              student_id: this.selectedStudent.class_student_id
            }
          });
        }
            },
            immediate: true,
        },
    },
    methods: {
        handleClick(item, index) {
            this.selectedIndex = index;
            this.selectedStudent = item;
            this.$router.replace({query: {
                admission_id: item.admission_id,
                student_id: item.class_student_id
            }})
        },
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
        logout() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/auth/login')
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
    background-color: #fff;
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
    background-color: #FFF;
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

.small-container .name {
    height: 33px;
}

.selected {
    border-radius: 8px;
    border: 1px solid #FFF;
    background: #0A4C90;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.20);
    width: 180px;
}

.not-selected {
    border-radius: 8px;
    background: #0A4C90;
    width: 180px;
    opacity: 0.5;
}

.students {
    overflow: auto;
}
.custom-toggle {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>