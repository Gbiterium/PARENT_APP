<template>
  <div class="footer">
    <div class="container">
      <div class="d-flex align-items-center py-3">
        <div
          v-for="(el, index) in $route.name.includes('schools')
            ? schoolTabs
            : tabs"
          :key="index"
          class="ml-3"
        >
          <div
            class="d-flex align-items-center pointer"
            :class="el.active ? 'active' : 'tab-inactive'"
            @click.prevent="handleSwitch(el)"
          >
            <b-icon :icon="el.icon" />
            <div
              class="font-weight-600 fs-14 ml-1"
              :class="{ 'd-none': !el.active }"
            >
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
        {
          name: "Students",
          icon: "people-fill",
          route: '',
          active: true,
        },
        {
          name: "Calendar",
          icon: "calendar2-date-fill",
          route: '',
          active: false,
        },
        {
          name: "Newsletter",
          icon: "envelope-fill",
          route: '',
          active: false,
        },
        {
          name: "Finance",
          icon: "bank2",
          route: '',
          active: false,
        },
      ],
      schoolTabs: [
        {
          name: "Schools",
          icon: "house-door-fill",
          route: "/schools",
          active: true,
        },
        {
          name: "Discovery",
          icon: "briefcase-fill",
          route: "/schools/coming-soon",
          active: false,
        },
      ],
    };
  },
  watch: {
    '$route': {
      handler(val) {
        this.updateTabsRoute(val)
      },
      immediate: true
    }
  },
  methods: {
    updateTabsRoute(route) {
      this.tabs.forEach((tab) => {
        tab.route = tab.name === 'Students' ? `/${route.params.school}` : `/${route.params.school}/coming-soon`;
      });
    },
    handleSwitch(selectedTab) {
      const storageKey = this.$route.name.includes("schools")
        ? "schoolActiveTab"
        : "activeTab";
      for (const tab of this.$route.name.includes("schools")
        ? this.schoolTabs
        : this.tabs) {
        tab.active = tab.name === selectedTab.name;
      }
      if (selectedTab.route) {
        this.$router.push(selectedTab.route);
        this.$cookies.set(storageKey, selectedTab.name);
      }
    },
  },
  created() {
    const storageKey = this.$route.name.includes("schools")
      ? "schoolActiveTab"
      : "activeTab";
    const activeTab = this.$cookies.get(storageKey);
    if (activeTab) {
      this.handleSwitch({ name: activeTab });
    }
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  border-top: 0.5px solid #dbeaf4;
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
