<template>
  <div class="pt-3">
    <div class="chat-view">
      <div v-if="!messages.length && !showDocsFile"
        class="d-flex flex-column align-items-center justify-content-center text-center chat-area">
        <div class="mb-4">
          <img class="img-fluid" src="@/assets/img/empty-chats.svg" />
        </div>
        <div class="font-weight-bold fs-16 mb-3">
          It’s Nice to chat with someone. 😊
        </div>
        <div class="fs-12 text-lighter">
          Search for someone from the left menu<br />and start your conversation
        </div>
      </div>
      <div v-if="messages.length && !showDocsFile" class="chat-area" id="chatView">
        <div v-for="(message, messageIndex) in messages" :key="messageIndex" class="mb-2">
          <div v-if="message.post || message.file" class="d-flex lightbluebh px-md-3 px-2" :class="`d-flex justify-content-${message.entity === 'family' ? 'end' : 'start'
            }`">
            <div class="d-flex align-items-center mr-2 text-primary">
              <span style="transform: rotate(360deg)" @click.prevent="replyMessage(message)">
                <b-icon-reply-fill class="fs-14 pointer" />
              </span>
            </div>
            <div>
              <div v-if="message.reply" class="reply-box rounded p-1" :style="{
                fontSize: '0.5rem',
                backgroundColor: '#F4F6F8',
              }">
                <p :style="{ fontSize: '0.7rem' }" class="m-0 text-primary">
                  {{ message.reply_for.reply_post_name }}
                </p>
                <!-- <p :style="{ fontSize: '0.7rem' }" class="m-0 text-secondary">
                          title
                        </p> -->
                <p :style="{ fontSize: '0.7rem' }" class="m-0">
                  {{ message.reply_for.reply_post }}
                </p>
              </div>
              <div class="bg-white">
                <small v-if="message.entity !== 'family'" class="text-primary font-weight-bold fs-14 p-1">{{
                  message.name
                }}</small>
                <div v-if="message.file">
                  <div v-if="message.file[0]" class="bg-white" @click="openViewer(message, message.file[0])">
                    <!-- <div v-if="imageViewExpanded"></div> -->
                    <!-- <pre>{{ message.file }}</pre> -->

                    <div class="">
                      <div v-if="message.file[0].format == '.png' ||
                        message.file[0].format == '.jpg' ||
                        message.file[0].format == '.jpeg'
                        " class="p-1" style="width: 200px">
                        <img :src="message.file[0].url" style="width: 200px; height: 100px" class="img-fluid" alt="" />
                      </div>
                      <div v-if="message.file[0].format == '.pdf' ||
                        message.file[0].format == '.docx' ||
                        message.file[0].format == '.ppt'
                        " class="bg-white rounded w-100 p-1">
                        <a :href="message.file[0].url" target="_blank">
                          <b-icon-file-earmark class="text-dark" />
                          <span class="text-dark fs-12"> {{ message.file[0].file_name }}</span>
                        </a>
                      </div>
                      <div v-if="message.file[0].format == '.mp4' ||
                        message.file[0].format == '.webmb'
                        " class="lightbluebg w-100 p-1">
                        <video :src="message.file[0].url" style="width: 200px" class="img-fluid"></video>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="message.post">
                  <div class="rounded bg-white px-1">
                    <p class="m-0 fs-14">
                      {{ message.post }}
                    </p>
                  </div>
                </div>

                <div class="px-1 m-0 fs-12 d-flex justify-content-end ml-5" style="color: #94969e">
                  {{ convertDate(message.datetime) }}
                  <div v-if="message.entity === 'family'" class="text-primary ml-1">
                    <!-- Delivered -->
                    <b-icon-check-all class="fs-14" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div v-if="showDocsFile" class="p-2 modal-backdropp">
        <div class="d-flex justify-content-between px-4 mb-2">
          <div class="row">
            <div class="mr-3">
              <img class="avatar-img img-fluid" :src="previewImaged.profile.image
                ? previewImaged.profile.image
                : require(`~/assets/img/${previewImaged.profile.gender === 'male' ? 'male' : 'female'
                  }-young.jpeg`)
                " />
            </div>
            <div>
              <div class="small text-truncater mr-2 text-white">
                {{ previewImaged.profile.name }}
              </div>
              <div class="small text-truncater mr-2 text-white">
                {{ previewImaged.profile.datetime.slice(11, 16) }}
                {{
                  parseInt(previewImaged.profile.datetime.slice(11, 13)) > 12
                  ? "PM"
                  : "AM"
                }}
              </div>
            </div>
          </div>
          <div class="text-white mt-2">
            <a id="a1" download="file1.png" @click="downloadPreviewImage">
              <b-icon-download class="fs-20" :style="{ fontSize: '1.5rem' }" />
            </a>
            <span class="ml-2">
              <b-icon-x class="fs-20" :style="{ fontSize: '1.5rem' }" @click="closeViewer" />
            </span>
          </div>
        </div>
        <div class="mx-5 mt-5 h-75">
          <img :src="previewImaged.img" alt="" class="img-fluid" width="100%" height="100%" />
        </div>
      </div>
      <div class="chat-message-input">
        <div class="px-2" :style="{ backgroundColor: '#F4F6F8' }">
          <client-only>
            <VEmojiPicker v-show="showDialog" :style="{ width: '100%', height: 'auto', backgroundColor: '#F4F6F8' }"
              label-search="Search" lang="pt-BR" @select="onSelectEmoji" />
          </client-only>
        </div>
        <div :style="{ postion: 'relative', backgroundColor: '#F4F6F8' }">
          <div v-if="reply.id" class="ml-4 p-1 reply-box-container"
            :style="{ position: '', bottom: '5rem', right: '35%' }">
            <div class="row">
              <div class="col-10 rounded reply-box w-100" :style="{ backgroundColor: '#F0F7FC' }">
                <small class="text-primary fs-14 font-weight-bold m-0 p-0">
                  {{ reply.name }}
                </small>
                <div class="time fs-12 font-weight-bold m-0 p-0">
                  {{ reply.thread_title }}
                </div>

                <div class="m-0 p-0 fs-12 text-truncater">{{ reply.post }}</div>
              </div>
              <div class="col-2 d-flex align-items-center text-danger" @click="reply = {}">
                <b-icon-x class="fs-24 mr-3" />
              </div>
            </div>
          </div>
        </div>
        <div class="row ml-2 mr-5" :style="{ backgroundColor: '#f0f7fb' }">
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
          <div v-if="loading" class="m-2 ml-5 spinner-border text-blue m-0" role="status">
            <span class="sr-only mt-2"></span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center pl-2 pb-3">
          <div class="w-100 input-wrapper">
            <input v-model="messageToSend.post" class="form-control" type="text" placeholder="Message"
              @keyup.enter="postMessage" />
            <div class="attach-icon">
              <b-dropdown size="lg" variant="link" menu-class="custom-menu" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <b-icon-paperclip class="fs-18 pointer text-dark" />
                </template>
                <b-dropdown-item><span class="video d-flex align-items-center justify-content-center"
                    @click.prevent="addFile('video')"><b-icon-camera-video-fill
                      class="fs-14 text-white" /></span></b-dropdown-item>
                <b-dropdown-item><span class="document d-flex align-items-center justify-content-center"
                    @click.prevent="addFile('document')"><b-icon-file-text
                      class="fs-14 text-white" /></span></b-dropdown-item>
                <b-dropdown-item><span class="image d-flex align-items-center justify-content-center"
                    @click.prevent="addFile('photo')"><b-icon-image class="fs-14 text-white" /></span></b-dropdown-item>
              </b-dropdown>
              <input ref="fileInputImage" class="d-none" type="file" accept="image/png, image/gif, image/jpeg"
                @change="previewImage('image')" />
              <input ref="fileInputVideo" class="d-none" type="file" accept="video/mp4,video/x-m4v,video/*"
                @change="previewImage('video')" />
              <input ref="fileInputDocument" class="d-none" type="file"
                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" @change="previewImage('file')" />
            </div>
            <div class="mr-2 emoji-icon pointer">
              <span class="pl-1 fs-18" @click="toogleDialogEmoji">😊</span>
            </div>
          </div>
          <div v-if="showAudio">
            <b-icon-mic-fill class="mx-2 text-blue fs-20" />
          </div>
          <div v-else @click.prevent="postMessage">
            <b-icon-arrow-right-circle-fill class="text-blue pointer ml-2 fs-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";
import { VEmojiPicker } from "v-emoji-picker";
export default {
  layout: 'parent',
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      messages: [],
      messageToSend: {
        post: "",
        file: [],
      },
      reply: {},
      filetype: "",
      fileContent: {},
      imageExpanded: false,
      imageUrl: '',
      targetFiles: [],
      showDialog: false,
      messageFiles: [],
      messageToPass: {},
      fileToPass: {
        file_id: "",
        format: "",
        relative_url: "",
        url: "",
      },
      showDocsFile: false,
      docsFile: '',
      previewImaged: {
        profile: "",
        img: "",
      },
      loading: false,
    }
  },
  watch: {
    '$route': {
      async handler(val) {
        if (this.$route.query.student_id) {
          await this.getCommunications()
        }
        this.showDocsFile = false
      },
      immediate: true
    }
  },
  computed: {
    school() {
      return this.$store.getters["school/getSchoolByCode"](this.$route.params.school);
    },
  },
  methods: {
    scrollToBottomOfChat() {
      const objDiv = document.getElementById("chatView");

      setTimeout(() => {
        window.scrollTo(0, objDiv ? objDiv.scrollHeight : 10000)
      }, 100);
    },
    openViewer(message, file) {
      // this.$bvModal.show('modal-1')
      window.scrollTo(0, 0)
      this.showDocsFile = true
      this.docsFile = file.url;
      this.previewImaged.img = file.url
      this.previewImaged.profile = message;
    },
    closeViewer() {
      this.previewImaged = {
        profile: '',
        img: '',
      }
      this.showDocsFile = false
      this.scrollToBottomOfChat()
    },
    async downloadPreviewImage() {
      try {
        const response = await axios.get(this.previewImaged.profile.file[0].url, {
          responseType: "blob",
        });
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${this.previewImaged.profile.file[0].file_name}`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error(error);
      }
    },
    onSelectEmoji(emoji) {
      this.messageToSend.post += emoji.data;
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    async getCommunications() {
      try {
        const response = await this.$axios.get(
          `communications/v3/class/student/${this.$route.query.student_id}/parent/chats/`
        )
        this.messages = response.data.data.results.reverse();
        this.scrollToBottomOfChat();
      } catch (error) {
        console.log(error)
      }
    },
    replyMessage(message) {
      this.reply = message;
    },
    convertDate(value) {
      const newDate = DateTime.fromSQL(value).toFormat("t");
      const meridiem = DateTime.fromSQL(value).toFormat("a");
      return newDate;
    },
    async postMessage() {
      const payload = {
        message: this.messageToSend.post,
        files: this.messageFiles,
        reply_post_id: this.reply.id,
        topic: "",
      };
      this.showDialog = false

      try {
        if (this.messageToSend.post) {
          await this.$axios.post(
            `/communications/v3/class/student/${this.$route.query.student_id}/parent/chat/post/`,
            payload
          );

          this.messageToSend.post = "";
          this.messageFiles = [];
          await this.getCommunications();
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
    async previewImage(type) {
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
        console.log(this.messageFiles, 'hello')
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
.chat-view {
  background: #f0f7fb;
  overflow: auto;
  min-height: 83vh;
}

.chat-message-input {
  position: fixed;
  bottom: 0;
  background: #f0f7fb;
  width: 98%;
}

.chat-area {
  /* min-height: 83vh; */
  overflow: auto;
  padding: 50px 0px 100px 0px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  padding-right: calc(20px + 10px + 0.4rem);
  padding-left: calc(20px + 10px + 0.4rem);
}

.attach-icon {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.emoji-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.image {
  width: 36px;
  height: 36px;
  background: #17a2b8;
  border-radius: 50%;
}

.avatar-img {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 1000px;
}

.video {
  width: 36px;
  height: 36px;
  background: #dc3545;
  border-radius: 50%;
}
.img-fluid {
  max-width: 100% !important;
  max-height: 100% !important;
}

.document {
  width: 36px;
  height: 36px;
  background: #1070b7;
  border-radius: 50%;
}

.reply-box {
  border-left: 5px solid #1675b6;
}

.modal-backdropp {
  position: absolute;
  top: 9.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #111c22;
  z-index: 2;
  height: 85vh;
}
</style>