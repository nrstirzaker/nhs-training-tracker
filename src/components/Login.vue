<script lang="ts">
import {defineComponent} from 'vue'

import PocketBase from 'pocketbase';
import axios from "axios";
import {DB_URL_ROOT} from "@/Constants.js";

const pb = new PocketBase(DB_URL_ROOT);

export default defineComponent({

  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async "onSubmit"(e) {
      e.preventDefault();
      //const authData = await pb.collection('users').authWithPassword('nrstirzaker.techblog@gmail.com', '3f1l35!!');
      const userAuth = localStorage.getItem("pocketbase_admin_auth")
      if (userAuth){
        console.log("ok")
      }

      const headers = {
        "Authorization": userAuth
      };
      const data = {first_name:"fred", last_name:"blogs"}
      axios.post(DB_URL_ROOT + '/api/collections/Staff/records',data, {headers})
          .then(response => console.log(response))


    }
  },

  name: "Login"
})
</script>

<template>
  <section class="form">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input v-model="form.username" class="input" type="text" placeholder="username">
      </div>
      <div class="control">
        <input v-model="form.password" class="input" type="password" placeholder="password">
      </div>
      <div class="button">
        <input type="submit" @click='onSubmit' class="btn btn-block" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>