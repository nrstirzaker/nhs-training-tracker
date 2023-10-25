<script>
import Sidebar from "./components/sidebar/Sidebar.vue";
import {sidebarWidth} from "./components/sidebar/state.js";
import PocketBase from 'pocketbase';
import {onMounted} from "vue";
import  {useBandOptionsStore} from "./store/BandOptionsStore.js";



const pb = new PocketBase('http://127.0.0.1:8090');


export default {
  components: {Sidebar},
  setup() {
    onMounted(() => {
      pb.admins.authWithPassword('nrstirzaker.techblog@gmail.com', 'rush:RECEIVE:decided:02');
      sessionStorage.setItem('token', pb.authStore.token)
      const store = useBandOptionsStore();
      store.fetchBandOptions();
    })
    return {sidebarWidth}

  }


}


</script>

<template>
  <Sidebar/>
  <div :style="{'margin-left':sidebarWidth}">
    <router-view/>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2F855A;
  --sidebar-item-hover: #38A169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;


}
</style>
