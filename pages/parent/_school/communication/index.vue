<template>
  <div class="pt-3">
    <div class="chat-view">
      <div v-if="!messages.length"
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
      <div v-else class="chat-area" id="chatView">
        <div v-for="(message, messageIndex) in messages" :key="messageIndex" class="mb-2">
          <div v-if="message.post || message.file" class="d-flex lightbluebh px-md-3 px-2" :class="`d-flex justify-content-${message.entity === 'family' ? 'end' : 'start'
            }`">
            <div class="d-flex align-items-center mr-2 text-primary">
              <span style="transform: rotate(360deg)" @click="replyMessage(message)">
                <b-icon-reply-fill class="fs-14 pointer"/>
              </span>
            </div>

            <div>
              <div class="bg-white rounded">
                <small class="text-primary font-weight-bold fs-10 p-1">{{
                  message.name
                }}</small>
                <div v-if="message.file">
                  <div v-if="message.file[0]" class="reply-box bg-white" @click="openViewer(message, message.file[0])">
                    <div v-if="imageViewExpanded"></div>
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
                          <span class="iconify" data-icon="ant-design:file-pdf-filled" data-width="20"
                            data-height="20"></span>
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
                <div v-if="message.post" class="py-1">
                  <div class="reply-box rounded bg-white p-1">
                    <p :style="{ fontSize: '0.7rem' }" class="m-0">
                      {{ message.post }}
                    </p>
                  </div>
                </div>

                <div class="px-1 fs-10" style="color: #94969e">
                  {{ convertDate(message.datetime) }}
                </div>
              </div>

              <div v-if="message.entity === 'family'" class="d-flex justify-content-end text-primary"
                :style="{ fontSize: '0.65rem' }">
                Delivered
              </div>
            </div>

            <div>
              <div v-if="filetype !== 'file'">
                <PagesParentImageViewer v-if="imageExpanded && fileToPass.format !== '.pdf'" :message="message"
                  :image-url="imageUrl" :filetype="filetype" :message-to-send="messageToSend" :image-expanded="false"
                  @closeImagePreview="closeImagePreview" @sendImage="sendImage" />
              </div>
              <!-- 
                      <pre>{{ filetype }}</pre>

                      <div v-if="filetype === 'file'">{{ imageUrl }}</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="chat-message-input d-flex justify-content-between align-items-center pl-2 py-3">
        <div class="w-100">
          <input v-model="messageToSend.post" class="form-control" type="text" placeholder="Message" @keyup.enter="postMessage" />
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
</template>

<script>
import { DateTime } from "luxon";
export default {
  layout: 'parent',
  data() {
    return {
      messages: [],
      messageToSend: {
        post: "",
        file: [],
      },
      reply: {},
    }
  },
  watch: {
    '$route': {
      async handler(val) {
       if (this.$route.query.student_id) {
        await this.getCommunications()
        }
      },
      immediate: true
    }
  },
  async created() {
  },
  methods: {
    scrollToBottomOfChat() {
      const objDiv = document.getElementById("chatView");

      setTimeout(() => {
        window.scrollTo(0, objDiv.scrollHeight)
      }, 100);
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
      return newDate + " " + meridiem;
    },
    async postMessage() {
      const payload = {
        message: this.messageToSend.post,
        files: this.messageToSend.file,
        reply_post_id: this.reply,
        topic: "",
      };

      try {
        await this.$axios.post(
          `/communications/v3/class/student/${this.$route.query.student_id}/parent/chat/post/`,
          payload
        );

        this.messageToSend.post = "";
        this.messageToSend.file = [];
        await this.getCommunications();
        this.reply = {};
      } catch (e) {
        console.log(e);
      }
    },
  }
}
</script>

<style scoped>
.chat-view {
  background: #f0f7fb;
  overflow: auto;
  /* min-height: 83vh; */
}

.chat-message-input {
  position: fixed;
  bottom: 0;
  background: #f0f7fb;
  width: 98%;
}

.chat-area {
  min-height: 83vh;
  overflow: auto;
  padding: 50px 0px 80px 0px;
}
</style>