<template>
    <div class="pt-3">
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
          <div class="chat-message-input d-flex justify-content-between align-items-center ml-2 my-3">
                <div class="w-100">
                <input v-model="message" class="form-control" type="text" placeholder="Message" />
                </div>
                <div v-if="showAudio">
                <b-icon-mic-fill class="mx-2 text-blue fs-20" />
                </div>
                <button v-else class="btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 12C24 18.6271 18.6271 24 12 24C5.37288 24 1.90735e-06 18.6271 1.90735e-06 12C1.90735e-06 5.37288 5.37288 0 12 0C18.6271 0 24 5.37288 24 12ZM11.7317 6.72923C11.6457 6.81461 11.5772 6.91611 11.5304 7.02793C11.4835 7.13975 11.4592 7.25971 11.4587 7.38094C11.4582 7.50218 11.4816 7.62233 11.5276 7.73452C11.5735 7.84671 11.6411 7.94875 11.7265 8.03481L14.745 11.0769H7.03846C6.79365 11.0769 6.55886 11.1742 6.38575 11.3473C6.21264 11.5204 6.11539 11.7552 6.11539 12C6.11539 12.2448 6.21264 12.4796 6.38575 12.6527C6.55886 12.8258 6.79365 12.9231 7.03846 12.9231H14.745L11.7265 15.9652C11.6412 16.0513 11.5736 16.1535 11.5277 16.2657C11.4817 16.378 11.4584 16.4982 11.4589 16.6195C11.4594 16.7408 11.4839 16.8607 11.5308 16.9726C11.5777 17.0844 11.6462 17.186 11.7323 17.2713C11.8184 17.3567 11.9206 17.4243 12.0328 17.4702C12.1451 17.5162 12.2653 17.5395 12.3866 17.539C12.5079 17.5384 12.6279 17.514 12.7397 17.4671C12.8516 17.4202 12.9531 17.3517 13.0385 17.2656L17.6187 12.6502C17.7902 12.4773 17.8865 12.2436 17.8865 12C17.8865 11.7564 17.7902 11.5227 17.6187 11.3498L13.0385 6.73442C12.9531 6.64817 12.8515 6.57961 12.7396 6.53266C12.6276 6.48571 12.5075 6.46129 12.3862 6.46081C12.2648 6.46033 12.1445 6.48379 12.0322 6.52985C11.9199 6.5759 11.8178 6.64366 11.7317 6.72923Z"
                      fill="#1070B7" />
                  </svg>
                </button>
              </div>
    </div>
</template>

<script>
export default {
    layout: 'parent',
    data () {
        return {
            chats: [
                {name: 'John Doe', id: 1}
            ]
        }
    },
    methods: {
        handleClick(el) {
            this.$router.push(`/parent/communication/${el.id}`)
        }
    }
}
</script>

<style scoped>
.chat-view {
    background: #f0f7fb;
    min-height: 83vh;
    overflow: auto;
}
.chat-message-input {
    position: fixed;
    bottom: 0;
    background: #f0f7fb;
    width: 98%;
}
</style>