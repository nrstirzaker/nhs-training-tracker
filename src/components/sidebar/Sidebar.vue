<script lang="ts">
import {defineComponent} from 'vue'
import SidebarLink from "./SidebarLink.vue";
import {collapsed, toggleSidebar, sidebarWidth} from './state.js'

export default defineComponent({
  name: "Sidebar.vue",
  components: {SidebarLink},
  props: {},
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  }
})
</script>

<template>
  <div class="sidebar" :style="{width : sidebarWidth}">
    <h1>
      <span v-if="collapsed">
        <div>M</div>
      </span>
      <span v-else>Menu</span>
    </h1>
    <SidebarLink icon="fas fa-columns" to="/dashboard">Dashboard</SidebarLink>
    <SidebarLink icon="fa-solid fa-user-doctor" to="/staff">Staff</SidebarLink>
    <SidebarLink icon="fa-solid fa-bed-pulse" to="/equipment">Equipment</SidebarLink>
    <SidebarLink icon="fa-solid fa-clipboard-list" to="/training">Training</SidebarLink>
    <SidebarLink icon="fa-solid fa-screwdriver-wrench" to="/admin">Admin</SidebarLink>
  <span
      class="collapse-icon"
      @click="toggleSidebar"
      :class="{'rotate-180': collapsed}"
  >
    <i class="fas fa-angle-double-left"/>
  </span>

  </div>
</template>

<style scoped>
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180{
  transform: rotate(180deg);
  transition: 0.2s linear;
}

</style>