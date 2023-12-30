<script >
import Sidebar from "./components/sidebar/Sidebar.vue";
import {sidebarWidth} from "@/components/sidebar/state.ts";
import PocketBase from 'pocketbase';
import {useBandListStore} from "@/store/BandListStore";
import {useStaffStore} from "@/store/StaffStore";
import {DB_URL_ROOT} from "@/Constants.js";
import { DialogWrapper } from 'vue3-promise-dialog';




const pb = new PocketBase(DB_URL_ROOT);

export default {
  components:{
    Sidebar,DialogWrapper
  },
  computed: {
    sidebarWidth() {
      return sidebarWidth
    }
  },
  created() {
    this.init();
  },
  methods: {
    init: async function () {
      await pb.admins.authWithPassword('nrstirzaker.techblog@gmail.com', 'rush:RECEIVE:decided:02');
      sessionStorage.setItem('token', pb.authStore.token)

      const bandStore = useBandListStore();
      await bandStore.load();


      const staffStore = useStaffStore();
      await staffStore.refresh();
    }
  }
}


</script>

<template>
  <Sidebar/>
  <div :style="{'margin-left':sidebarWidth}">
    <router-view/>
  </div>
  <DialogWrapper/>
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
