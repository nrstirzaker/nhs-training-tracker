<script lang="ts">
import {defineComponent, ref} from 'vue'
import {basicRequestHeader, getBasicRequestHeader} from "../../views/form-utils";
import {Action} from "./Action.ds";
import axios from "axios";

export default defineComponent({
  name: "ButtonBar",
  computed: {
    Action() {
      return Action
    }
  },
  defineEmits: ['action'],
  setup(props,ctx){
    ctx.emit('action')
  },
  methods:{
    addStaff: function (event) {
      event.preventDefault();
      const requestHeader : basicRequestHeader = getBasicRequestHeader();
      const data = this.collateData();
      axios.post('http://127.0.0.1:8090/api/collections/Staff/records', data, {headers: requestHeader})
          .then(response => {
            this.$refs.staffListGrid.getStaffListData();
            this.clearForm();
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },
    updateStaff: function (event) {
      event.preventDefault();
      const requestHeader : basicRequestHeader = getBasicRequestHeader();
      const data = this.collateData();
      axios.post('http://127.0.0.1:8090/api/collections/Staff/records', data, {"headers": requestHeader})
          .then(response => {
            this.$refs.staffListGrid.getStaffListData();
            this.clearForm();
            console.log(response)
          }).catch(error => {
        console.log(error)
      })
    },
    clearForm: function(event){
      event.preventDefault();
      this.form.clearForm(event);
    }
  }
})
</script>

<template>
  <div class="tw-flex tw-justify-between tw-max-w-full">
    <button type="button" class="tw-btn tw-btn-blue" @click="$emit('action',Action.AddAction)">Add</button>
    <button type="button" class="tw-btn tw-btn-blue" @click=this.clearForm>Cancel</button>
    <button type="button" class="tw-btn tw-btn-blue" @click=this.updateStaff>Update</button>
    <button type="button" class="tw-btn tw-btn-red">Archive</button>
  </div>
</template>

<style scoped>

</style>