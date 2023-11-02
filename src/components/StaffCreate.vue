<script lang="ts">
import axios from 'axios'
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
export default{

  data() {
    return {
      form:{
        firstName: '',
        lastName:''
      }
    }
  },
  methods : {
    async onSubmit(e){
      e.preventDefault();
      const authData = await pb.collection('users').authWithPassword('s.stirzaker', 'M742TBFruby*car');
      const headers = {
        "Authorization": authData
      };
      const data = {first_name:this.form.firstName, last_name:this.form.lastName}
      axios.post('http://127.0.0.1:8090/api/collections/Staff/records',data, {headers})
          .then(response => console.log(response))
    }
  }
}
</script>

<template>
  <section class="form">
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input v-model="form.firstName" class="input" type="text" placeholder="First Name">
      </div>
      <div class="control">
        <input v-model="form.lastName" class="input" type="text" placeholder="Last Name">
      </div>
      <div class="tw-button">
        <input type="submit" @click='onSubmit' class="tw-btn tw-btn-block" />
      </div>
    </div>
  </section>
</template>

<style scoped>


</style>