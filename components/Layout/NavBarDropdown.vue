<template>
    <div>
        <div class="dropup text-blue"  v-click-outside="closeDropdown">
            <div class="p-3 border-bottom">Hi, {{ getUser.first_name }} {{ getUser.last_name }}</div>
                            <div class="p-3 border-bottom pointer"><b-icon-person-circle class="mr-2" />My Profile</div>
                            <div class="p-3 border-bottom pointer"><b-icon-bell-fill class="mr-2" />Notifications</div>
                            <div class="p-3 pointer" @click.prevent="logout()"><b-icon-power class="mr-2" />Log out</div>
                            </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    computed: {
        ...mapGetters('auth', ['getUser'])
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/auth/login')
        },
        closeDropdown() {
            this.$emit('close-dropdown')
        }
    }
}
</script>

<style scoped>
.dropup {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    animation: buttomUp .5s ease-out 0s;
}
</style>