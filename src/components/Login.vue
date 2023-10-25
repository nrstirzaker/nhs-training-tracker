<script lang="ts">
import {defineComponent} from 'vue'

import PocketBase from 'pocketbase';
import axios from "axios";

const pb = new PocketBase('http://127.0.0.1:8090');

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
      const authData = await pb.collection('users').authWithPassword('nrstirzaker.techblog@gmail.com, '3f1l35!!');
      const userAuth = localStorage.getItem("pocketbase_admin_auth")
      if (userAuth){
        console.log("ok")
      }

      const headers = {
        "Authorization": userAuth
      };
      const data = {first_name:"fred", family_name:"blogs"}
      axios.post('http://127.0.0.1:8090/api/collections/Staff/records',data, {headers})
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