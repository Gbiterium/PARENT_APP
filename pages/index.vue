<template>
  <div class="homepage bg-blue d-flex align-items-center">
    <div v-if="!loading" class="container">
    <VueSlickCarousel :arrows="false" :dots="showInstallButton ? false : true" :slides-to-show="1" :slides-to-scroll="1" :autoplay="true"
      :speed="1000" :autoplay-speed="4000">
      <div v-for="(el, index) in informations" :key="index">
        <div class="d-flex align-items-center justify-content-center img-wrapper">
          <div class="img-container d-flex align-items-center justify-content-center"
            :style="{ backgroundColor: el.bgColor }">
            <img :src="el.image">
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center text-center font-weight-bold fs-20 text-white mt-5">
          {{ el.title }}
        </div>
        <p class="px-4 text-center text-light font-weight-400 fs-14 mt-1">{{ el.description }}</p>
      </div>
    </VueSlickCarousel>
    <div class="cta">
      <div class="d-flex justify-content-center">
    <button class="btn btn-light font-weight-600 py-2 px-5 mb-2" @click="installPWA" v-if="showInstallButton">Install App</button>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <button class="btn btn-dark font-weight-600 py-2 px-5 max-width" @click.prevent="$router.push('/auth/signup')">
        Sign Up
      </button>
      <button class="btn btn-light font-weight-600 py-2 px-5 ml-4 max-width" @click.prevent="$router.push('/auth/login')">
        Login
      </button>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: 'IndexPage',
  components: { VueSlickCarousel },
  data() {
    return {
      informations: [
        { title: 'Monitor your child’s progress', description: 'Gain access to your child’s grades, exercises and progress in school.', image: require('@/assets/img/goal.svg'), bgColor: '#E3F9FD' },
        { title: 'Manage School Bills and Invoices', description: 'Easy payment of receipt of bills from your child’s school.', image: require('@/assets/img/bill.svg'), bgColor: '#FEF8D8' },
        { title: 'Communicate with your child’s teacher', description: 'Convenient way to send messages, recieve daily communication logs.', image: require('@/assets/img/chat.svg'), bgColor: '#EBF0FE' },
      ],
      loading: true,
      deferredPrompt: null,
    }
  },
  computed: {
    showInstallButton() {
      return this.deferredPrompt !== null;
    },
  },
  mounted () {
    if(this.$store.state.auth.token) {
      this.$router.push('/schools')
    }
    setTimeout(() => {
      this.loading = false
    }, 500)
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
    // this.installPWA()
  },
  methods: {
    installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation prompt');
          }
          this.deferredPrompt = null;
        });
      }
    },
  }
}
</script>
<style scoped>
.img-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #E3F9FD;
}

.homepage {
  height: 100vh
}

.cta {
  position: absolute;
  bottom: 0px;
  left: 50%;
    transform: translate(-50%, -30%);
}
.max-width {
  white-space: nowrap;
}
</style>