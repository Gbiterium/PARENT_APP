<template>
    <div class="footer">
      <div class="container">
        <div class="d-flex align-items-center py-3">
          <div v-for="(el, index) in $route.name === 'schools' ? schoolTabs : tabs" :key="index" class="ml-3">
            <div
              class="d-flex align-items-center pointer"
              :class="el.active ? 'active' : 'tab-inactive'"
              @click.prevent="handleSwitch(el)"
            >
              <b-icon :icon="el.icon" />
              <div class="font-weight-600 fs-14 ml-1" :class="{ 'd-none': !el.active }">
                {{ el.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: [
          { name: 'Students', icon: 'people-fill', active: true },
          { name: 'Calendar', icon: 'calendar2-date-fill', active: false },
          { name: 'Newsletter', icon: 'envelope-fill', active: false },
          { name: 'Finance', icon: 'bank2', active: false },
        ],
        schoolTabs: [
        { name: 'Schools', icon: 'house-door-fill',  active: true },
        { name: 'Discovery', icon: 'briefcase-fill', active: false }
      ]
      };
    },
    methods: {
      handleSwitch(selectedTab) {
    for (const tab of this.$route.name === 'schools' ? this.schoolTabs : this.tabs) {
      tab.active = tab.name === selectedTab.name;
    }
    if (selectedTab.route) {
      this.$router.push(selectedTab.route);
    }
  }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    position: fixed;
    bottom: 0;
    border-top: 0.5px solid #DBEAF4;
    width: 100%;
    background: #fff;
  }
  
  .tab-inactive {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #989b9e;
    display: flex;
    justify-content: center;
    color: #fff;
  }
  
  .active {
    padding: 12px 24px;
    border-radius: 90px;
    background: #1c7adc;
    color: #fff;
  }
  </style>
  