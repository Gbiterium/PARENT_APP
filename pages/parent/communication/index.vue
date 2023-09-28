<template>
    <div class="">
        <div class="search-input px-3 py-2">
            <input type="search" placeholder="Search...." class="form-control" >
            <b-icon-search class="icon text-grey" />
        </div>
        <div class="chats-list">
            <div v-for="(conversation, index) in chats" :key="index" class="chat-list-item d-flex align-items-center px-3" @click.prevent="handleClick(conversation)">
              <div class="mr-3">
                <img class="avatar-img" src="@/assets/img/default_profile.png" />
              </div>
              <div class="w-100">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center mr-3">
                    <div class="chat-name text-truncater mr-2">
                      {{ conversation.name }}
                    </div>
                    <!-- <div v-if="conversation.unread_messages > 0" class="new-count">
                      {{ conversation.unread_messages }}
                    </div>
                  </div>
                  <div class="time">
                    {{ justTime(conversation.last_message_on) }}
                  </div> -->
                </div>
                <!-- <div class="message-preview text-truncater mt-2 pt-1 pr-3">
                  {{ conversation.last_message }}
                </div> -->
              </div>
            </div>
          </div>
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
.avatar-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
}
.search-input {
  position: relative;
}
.search-input .icon {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 25px;
  transform: translateY(-50%) !important;
}
.search-input input {
  padding-left: calc(20px + 10px + 0.4rem);
}
/* .chats-list {
    background: #f0f7fb;
    min-height: 75vh;
} */
</style>