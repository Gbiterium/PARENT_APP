<template>
  <div class="homepage bg-blue">
    <div v-if="!loading" class="container">
    <VueSlickCarousel :arrows="false" :dots="true" :slides-to-show="1" :slides-to-scroll="1" :autoplay="true"
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
    <div class="d-flex align-items-center justify-content-center cta">
      <button class="btn btn-dark font-weight-600 py-2 px-5 max-width" @click.prevent="$router.push('/auth/signup')">
        Sign Up
      </button>
      <button class="btn btn-light font-weight-600 py-2 px-5 ml-4 max-width" @click.prevent="$router.push('/auth/login')">
        Login
      </button>
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
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
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

.img-wrapper {
  padding-top: 20vh;
}

.cta {
  position: absolute;
  bottom: 4vh;
  left: 50%;
    transform: translate(-50%, -50%);
}
.max-width {
  white-space: nowrap;
}
</style>