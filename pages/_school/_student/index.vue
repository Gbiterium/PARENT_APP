<template>
    <div>
        <div :class="{ 'container': windowWidth > 767 }">
        <div class="topbar py-3" :class="{ 'container': windowWidth > 767 }">
            <div class="d-flex align-items-center justify-content-between mx-5">
                <div class="d-flex justify-content-center flex-column" @click.prevent="showMessage">
                    <div class="d-flex justify-content-center">
                        <b-icon-chat class="fs-30 text-light-blue" />
                    </div>
                    <div class="fs-14 mt-1 font-weight-600">Message</div>
                </div>
                <div class="d-flex justify-content-center flex-column" @click.prevent="showReport">
                    <div class="d-flex justify-content-center">
                        <b-icon-file-text class="fs-30 text-info" />
                    </div>
                    <span class="fs-14 mt-1 font-weight-600">Reports</span>
                </div>
                <div class="d-flex justify-content-center flex-column" @click.prevent="showLearning">
                    <div class="d-flex justify-content-center">
                        <b-icon-lightbulb class="fs-30 text-warning" />
                    </div>
                    <span class="fs-14 mt-1 font-weight-600">Learning</span>
                </div>
            </div>
            <hr />
            <div v-if="message" class="mx-2">
                <v-select
                    v-model="filter"
                    class="select"
                    :options="filters"
                    :clearable="false"
                  >
                  </v-select>
            </div>
        </div>
        <div v-if="message" class="mt-4 page-content">
            <div v-for="(group, date) in groupedData" :key="date" class="mt-2 mb-3">
                <div class="px-3 py-1 date fs-14 text-light-blue">{{ date }}</div>
                <div v-for="(item, index) in group" :key="item.id">
                    <div class="d-flex flex-grow-1 mt-3" :class="[index !== group.length - 1 ? 'mb-5' : '']">
                        <span v-if="item.file[0] && item.file[0].type && item.file[0].type.includes('image')" class="wrapper mx-3 d-flex align-items-center justify-content-center" style="background: #1070b7"><b-icon-image class="fs-24 text-white" /></span>
<span v-else-if="item.file[0] && item.file[0].type && item.file[0].type.includes('video')" class="wrapper mx-3 d-flex align-items-center justify-content-center" style="background: #dc3545"><b-icon-camera-video-fill class="fs-24 text-white" /></span>

                        <div v-else class="mx-3 icon-wrapper bg-info d-flex justify-content-center align-items-center">
                            <img src="@/assets/img/pencil.svg" />
                        </div>
                        <div>
                            <small class="text-primary font-weight-bold fs-12 py-1">{{
                  item.name
                }}</small>
                            <div v-if="item.post !== ''" class="font-weight-bold fs-14">{{ item.post }}</div>
                            <div class="fs-12 text-grey">{{ formatDate(item.datetime) }}</div>
                            <div v-if="item.file">
                  <div v-if="item.file[0]" class="bg-white font-weight-600">
                    <!-- <div v-if="imageViewExpanded"></div> -->
                    <!-- <pre>{{ item.file }}</pre> -->

                    <div class="">
                      <div v-if="item.file[0].format == '.png' ||
                        item.file[0].format == '.jpg' ||
                        item.file[0].format == '.jpeg'
                        " class="p-1">
                        <img :src="item.file[0].url" style="width: 100%; height: 200px; object-fit: cover;" class="img-fluid" alt="" />
                      </div>
                      <div v-if="item.file[0].format == '.pdf' ||
                        item.file[0].format == '.docx' ||
                        item.file[0].format == '.ppt'
                        " class="bg-white rounded w-100 p-1">
                        <a :href="item.file[0].url" target="_blank">
                          <b-icon-file-earmark class="text-dark" />
                          <span class="text-dark fs-14"> {{ item.file[0].file_name }}</span>
                        </a>
                      </div>
                      <div v-if="item.file[0].format == '.mp4' ||
                        item.file[0].format == '.webmb'
                        " class="lightbluebg w-100 p-1">
                        <video :src="item.file[0].url" style="width: 200px" class="img-fluid"></video>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="flex-grow-1"> -->
                <!-- <hr class="my-2"> -->
                <div class="w-100 d-flex align-items-center my-2">
                    <b-icon-reply class="fs-20 mr-4" />
                <b-icon-chat class="fs-20" />
                </div>
                            <!-- <hr class="my-2" /> -->
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-absolute" @click.prevent="$bvModal.show('send-message')">
                <!-- <span v-if="item.file.length > 0 && item.file[0].type.includes('image')" class="video d-flex align-items-center justify-content-center"><b-icon-camera-video-fill class="fs-18 text-white" /></span> -->
                <div class="icon-wrapper bg-blue d-flex align-items-center justify-content-center">
                    <b-icon-plus-lg class="text-white fs-18" />
                </div>
            </div>
            <div v-if="Object.keys(groupedData).length === 0"
            class="d-flex flex-column align-items-center justify-content-center text-center mt-4">
            <div class="mb-4">
              <img class="img-fluid" src="@/assets/img/empty-chats.svg" />
            </div>
            <div class="font-weight-bold fs-16 mb-3">
              It’s Nice to chat with someone. 😊
            </div>
            <div class="fs-12 text-lighter">
              Click on the bottom from left icon<br />and start your conversation
            </div>
          </div>
        </div>
        </div>
        <Reports :reports="reports" v-if="report" />
        <ComingSoon v-if="learning" />
        <SendMessageModal @refresh="refresh" />
    </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
    // middleware: 'route-guard',
    layout: 'parent',
    data () {
        return {
            filter: 'All Activities',
            filters: ['All Activities', 'Food'],
            message: true,
            report: false,
            learning: false,
            windowWidth: window.innerWidth,
            reports: []
        }
    },
    async asyncData({ $axios, route }) {
        try {
            const response = await $axios.get(`communications/v3/class/student/${route.params.student}/parent/chats/`);
            const messages = response.data.data.results;
            const groupedData = {};
            messages.forEach(item => {
                const dateTime = DateTime.fromSQL(item.datetime);
                const date = dateTime.toFormat('dd LLL yyyy');
                if (!groupedData[date]) {
                    groupedData[date] = [];
                }
                groupedData[date].push(item);
            });
            return {
                groupedData
            };
        }
        catch (error) {
            console.log(error);
        }
    },
    mounted() {
        this.getReportCard()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
    methods: {
        async getReportCard() {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/util/v2/mobile/reportcards/${this.$route.params.student}/`)
                this.reports = data.data.results
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        onResize() {
      this.windowWidth = window.innerWidth
        },
        showMessage() {
            this.message = true
            this.report = false
            this.learning = false
            this.$nuxt.refresh()
        },
        showReport() {
            this.message = false
            this.report = true
            this.learning = false
        },
        showLearning() {
            this.message = false
            this.report = false
            this.learning = true
        },
        goToReport(item) {
            this.$router.push({
                path: `/${this.$route.params.school}/${this.$route.params.student}/report-card`,
                query: {
                    name: this.$route.query.name,
                    class: this.$route.query.class,
                }
            })
        },
        formatDate(date) {
            const dateTime = DateTime.fromSQL(date);
            return dateTime.toFormat('h:mm a');
        },
        refresh() {
            this.$nuxt.refresh()
            window.scrollTo(0, 0)
        }
    },
}
</script>

<style scoped>
.date {
    background: #e7e8eb;
}

.icon-wrapper {
    min-width: 55px;
    height: 55px;
    border-radius: 50%;
}
.wrapper {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}

.topbar {
    position: fixed;
    background-color: #fff;
    width: 100%;
    top: 70px;
}

.page-content {
    padding-top: 120px;
    padding-bottom: 20px;
}
.btn-absolute {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>