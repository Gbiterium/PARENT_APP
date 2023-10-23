<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mx-5">
            <div class="d-flex justify-content-center flex-column">
                <div class="d-flex justify-content-center">
                    <b-icon-chat class="fs-20 text-light-blue" />
                </div>
                <div class="fs-14 mt-1">Message</div>
            </div>
            <div class="d-flex justify-content-center flex-column">
                <div class="d-flex justify-content-center">
                    <b-icon-file-text class="fs-20 text-info" />
                </div>
                <span class="fs-14 mt-1">Reports</span>
            </div>
            <div class="d-flex justify-content-center flex-column">
                <div class="d-flex justify-content-center">
                    <b-icon-lightbulb class="fs-20 text-warning" />
                </div>
                <span class="fs-14 mt-1">Learning</span>
            </div>
        </div>
        <hr />
        <div class="col-12">
            <select class="w-100 p-1 fs-14">
                <option value="All Activity" selected>All Activity</option>
                <option value="Food">Food</option>
            </select>
        </div>
        <div class="my-3">
            <div v-for="(group, date) in groupedData" :key="date" class="mt-2 mb-3">
            <div class="px-4 py-2 date fs-14 text-light-blue">{{ formatDate(date) }}</div>
            <div v-for="item in group" :key="item.id">
            <div class="fs-14 px-4">{{ item.post }}</div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
    layout: 'parent',
    async asyncData({ $axios, route }) {
        try {
        const response = await $axios.get(
          `communications/v3/class/student/${route.params.student}/parent/chats/`
        )
        const messages = response.data.data.results.reverse();
        const groupedData = {}
        messages.forEach(item => {
    const date = item.datetime;
    if (!groupedData[date]) {
        groupedData[date] = [];
    }
    groupedData[date].push(item);
});
console.log(groupedData)
        return {
            groupedData
        }
      } catch (error) {
        console.log(error)
      }
    },
    mounted() {
console.log(this.groupedData);
    },
    methods: {
        formatDate(date) {
            const dateTime = DateTime.fromSQL(date);
 return dateTime.toFormat('dd LLL yyyy');

        }
    }
}
</script>

<style scoped>
.date {
    background: #e7e8eb;
}
</style>