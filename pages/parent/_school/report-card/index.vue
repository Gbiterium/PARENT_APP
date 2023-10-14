<template>
    <div v-if="$route.query.student_id" class="container" style="padding-top: 4rem;">
        <div v-if="loading">
            <b-skeleton class="mt-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="78px"></b-skeleton>
            <b-skeleton class="mt-3" width="100%" height="78px"></b-skeleton>
        </div>
        <!-- <div v-else> -->
        <div v-if="reports.length > 0 && !loading" class="row">
        <div v-for="(el, index) in reports" :key="index" class="col-md-4 mb-2">
            <div class="card">
                <div class="m-3">
                    <div class="fs-14 slate-dark font-weight-600 text-capitalize">{{ el.name }}</div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="fs-12"><span class="text-grey">Uploaded on: </span><span class="text-blue">{{ formatDate(el.created_on) }}</span></div>
                        <div class="icon-wrapper d-flex justify-content-center align-items-center pointer">
                            <b-icon-download class="text-blue fs-20" @click.prevent="downloadFile(el)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- </div> -->
        <div v-if="reports && reports.length === 0 && !loading" class="no-content">
            <div>
            <img src="@/assets/img/empty-list.svg" />
            <div class="fs-14 text-black mt-2 text-capitalize">
            no results found
          </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { DateTime } from 'luxon'
export default {
    layout: 'parent',
    data() {
        return {
            reports: [],
            loading: true
        }
    },
    watch: {
    '$route': {
      async handler(val) {
        if (this.$route.query.student_id) {
          await this.getReportCard()
        }
      },
      immediate: true
    }
  },
    methods: {
        async getReportCard() {
            try {
                this.loading = true
                const { data } = await this.$axios.get(`/util/v2/mobile/reportcards/${this.$route.query.student_id}`)
                this.reports = data.data.results
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async downloadFile(file) {
      try {
        const response = await axios.get(file.file_url, {
          responseType: "blob",
        });
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `report.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (e) {
        console.error(e);
      }
    },
    formatDate(date) {
        return DateTime.fromSQL(date).toFormat("f");
    },
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
.no-content {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>