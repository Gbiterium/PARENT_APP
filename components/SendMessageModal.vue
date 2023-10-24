<template>
    <div>
        <ModalWrapper id="send-message" title="Send Message" submit-title="Send Message" @ok="postMessage">
            <form>
                <label>Message</label>
                <textarea v-model="message" class="form-control input" placeholder="Message"></textarea>
                <div class="mt-3">
                    <label>Attachment</label>
                    <div class="d-flex align-items-center">
                        <span class="video d-flex align-items-center justify-content-center mr-3"
                            @click.prevent="addFile('video')"><b-icon-camera-video-fill class="fs-14 text-white" /></span>
                        <span class="document d-flex align-items-center justify-content-center mr-3"
                            @click.prevent="addFile('document')"><b-icon-file-text class="fs-14 text-white" /></span>
                        <span class="image d-flex align-items-center justify-content-center"
                            @click.prevent="addFile('photo')"><b-icon-image class="fs-14 text-white" /></span>
                    </div>
                    <input ref="fileInputImage" class="d-none" type="file" accept="image/png, image/gif, image/jpeg"
                        @change="uploadImage('image')" />
                    <input ref="fileInputVideo" class="d-none" type="file" accept="video/mp4,video/x-m4v,video/*"
                        @change="uploadImage('video')" />
                    <input ref="fileInputDocument" class="d-none" type="file"
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" @change="uploadImage('file')" />
                </div>
                <div class="row mt-2">
          <div v-if="messageFiles.length" class="px-3 py-1">
            <div v-for="(file, fileIndex) in messageFiles" :key="fileIndex"
              class="btn btn-light text-dark bg-white p-1 mr-2">
              <b-icon-file-earmark />
              <span class="" :style="{ fontSize: '0.7rem' }">{{
                file.file_name
              }}</span>
              <span class="" @click="deleteMessageFile(file, fileIndex)">
                <b-icon-x class="fs-14 pointer text-danger" />
              </span>
            </div>
          </div>
          <div v-if="loading" class="m-2 spinner-border text-blue m-0" role="status">
            <span class="sr-only mt-2"></span>
          </div>
        </div>
            </form>
        </ModalWrapper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            messageFiles: [],
            reply: {},
            filetype: '',
            targetFiles: '',
            loading: false,
        }
    },
    computed: {
    school() {
      return this.$store.getters["school/getSchoolByCode"](this.$route.params.school);
    },
  },
    methods: {
        async postMessage() {
            const payload = {
                message: this.message,
                files: this.messageFiles,
                reply_post_id: this.reply.id,
                topic: "",
            };

            try {
                if (this.message || this.messageFiles.length > 0) {
                    const response = await this.$axios.post(
                        `/communications/v3/class/student/${this.$route.params.student}/parent/chat/post/`,
                        payload
                    );
                    if (response.status === 200) {
                        this.$bvModal.hide('send-message')
                        this.$emit('refresh')
                    }
                    this.message = "";
                    this.messageFiles = [];
                    this.reply = {};
                }
            } catch (e) {
                console.log(e);
            }
        },
        addFile(type) {
            if (type === "photo") {
                if (this.$refs.fileInputImage) {
                    const uploadField = this.$refs.fileInputImage;
                    uploadField.click();
                }
            }
            if (type === "video") {
                if (this.$refs.fileInputVideo) {
                    const uploadField = this.$refs.fileInputVideo;
                    uploadField.click();
                }
            }
            if (type === "document") {
                if (this.$refs.fileInputDocument) {
                    const uploadField = this.$refs.fileInputDocument;
                    uploadField.click();
                }
            }
        },
        async uploadImage(type) {
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
      this.filetype = type;
      this.targetFiles = event.target.files[0];
      this.loading = true
      const file = event.target.files[0];
      try {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        formData.append("type", file.type);
        const {
          data: { data },
        } = await this.$axios.post(
          `/communications/v3/school/${this.school.id}/file/upload/`,
          formData
        );
        this.messageFiles.push(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    },
    deleteMessageFile(e, i) {
      this.messageFiles.splice(i, 1);
    }
    }
}
</script>

<style scoped>
.input {
    min-height: 70px;
}

.image {
    width: 36px;
    height: 36px;
    background: #17a2b8;
    border-radius: 50%;
}

.video {
    width: 36px;
    height: 36px;
    background: #dc3545;
    border-radius: 50%;
}

.document {
    width: 36px;
    height: 36px;
    background: #1070b7;
    border-radius: 50%;
}
</style>