<template>
    <div class="">
        <div class="top-bar d-flex align-items-center justify-content-between p-3">
            <div class="d-flex align-items-center">
                <div class="pointer" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left-short class="fs-30" />
                </div>
              <div class="mr-3">
                <img class="avatar-img" src='@/assets/img/default_profile.png' />
              </div>
              <div class="chat-name">John Doe</div>
            </div>
            <div>
              <div class="dropdown">
                <button id="dropdownMenuButton"
                  class="btn rounded-pill d-flex align-items-center justify-content-center p-0" type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <b-icon-three-dots-vertical />
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Delete Chat</a>
                  <a class="dropdown-item" href="#">Archive Conversation </a>
                </div>
              </div>
            </div>
          </div>
        <div class="d-flex flex-column align-items-center justify-content-center text-center chat-view">
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
            <!-- <div class="px-2" :style="{ backgroundColor: '#F0F0F0' }">
            <VEmojiPicker v-show="showDialog" :style="{ width: '100%', height: 'auto' }" label-search="Search"
              lang="pt-BR" @select="onSelectEmoji" />
          </div> -->
    </div>
</template>

<script>
// import { VEmojiPicker } from "v-emoji-picker";
export default {
    // layout: 'parent',
    data () {
        return {
        showDialog: false,
        }
    }
}
</script>

<style scoped>
.avatar-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
}
.top-bar {
    position: fixed;
    width: 100%;
    background: #fff;
}
.chat-view {
    background: #f0f7fb;
    min-height: 100vh;
    overflow: auto;
}
</style>