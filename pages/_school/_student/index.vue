<template>
    <div>
        <div class="topbar py-3">
            <div class="d-flex align-items-center justify-content-between mx-5">
                <div class="d-flex justify-content-center flex-column">
                    <div class="d-flex justify-content-center">
                        <b-icon-chat class="fs-20 text-light-blue" />
                    </div>
                    <div class="fs-14 mt-1 font-weight-600">Message</div>
                </div>
                <div class="d-flex justify-content-center flex-column">
                    <div class="d-flex justify-content-center">
                        <b-icon-file-text class="fs-20 text-info" />
                    </div>
                    <span class="fs-14 mt-1 font-weight-600">Reports</span>
                </div>
                <div class="d-flex justify-content-center flex-column">
                    <div class="d-flex justify-content-center">
                        <b-icon-lightbulb class="fs-20 text-warning" />
                    </div>
                    <span class="fs-14 mt-1 font-weight-600">Learning</span>
                </div>
            </div>
            <hr />
            <div class="col-12">
                <select class="w-100 p-1 fs-14">
                    <option value="All Activity" selected>All Activities</option>
                    <option value="Food">Food</option>
                </select>
            </div>
        </div>
        <div class="my-3 page-content">
            <div v-for="(group, date) in groupedData" :key="date" class="mt-2 mb-3">
                <div class="px-3 py-1 date fs-14 text-light-blue">{{ date }}</div>
                <div v-for="item in group" :key="item.id">
                    <div class="d-flex align-items-center my-3">
                        <div class="mx-3 icon-container bg-info d-flex justify-content-center align-items-center">
                            <b-icon-pencil-square class="fs-20 text-white" />
                        </div>
                        <div>
                            <div v-if="item.file">
                  <div v-if="item.file[0]" class="bg-white font-weight-600">
                    <!-- <div v-if="imageViewExpanded"></div> -->
                    <!-- <pre>{{ item.file }}</pre> -->

                    <div class="">
                      <div v-if="item.file[0].format == '.png' ||
                        item.file[0].format == '.jpg' ||
                        item.file[0].format == '.jpeg'
                        " class="p-1" style="width: 200px">
                        <img :src="item.file[0].url" style="width: 200px; height: 100px" class="img-fluid" alt="" />
                      </div>
                      <div v-if="item.file[0].format == '.pdf' ||
                        item.file[0].format == '.docx' ||
                        item.file[0].format == '.ppt'
                        " class="bg-white rounded w-100 p-1">
                        <a :href="item.file[0].url" target="_blank">
                          <b-icon-file-earmark class="text-dark" />
                          <span class="text-dark"> {{ item.file[0].file_name }}</span>
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
                            <div v-if="item.post !== ''" class="font-weight-600">{{ item.post }}</div>
                            <div class="fs-12 text-grey">{{ formatDate(item.datetime) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-absolute" @click.prevent="$bvModal.show('send-message')">
                <!-- <span v-if="item.file && item.file[0].type.includes('image')" class="video d-flex align-items-center justify-content-center"><b-icon-camera-video-fill class="fs-18 text-white" /></span> -->
                <div class="icon-container bg-blue d-flex align-items-center justify-content-center">
                    <b-icon-plus-lg class="text-white fs-18" />
                </div>
            </div>
        </div>
        <SendMessageModal @refresh="refresh" />
    </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
    // middleware: 'route-guard',
    layout: 'parent',
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
            // console.log(groupedData);
            return {
                groupedData
            };
        }
        catch (error) {
            console.log(error);
        }
    },
    methods: {
        formatDate(date) {
            const dateTime = DateTime.fromSQL(date);
            return dateTime.toFormat('dd LLL yyyy') + ', ' + dateTime.toFormat('h:mm a');
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

.icon-container {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.video {
    width: 42px;
    height: 42px;
    background: #dc3545;
    border-radius: 50%;
}

.topbar {
    position: fixed;
    background-color: #fff;
    width: 100%;
    top: 75px;
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