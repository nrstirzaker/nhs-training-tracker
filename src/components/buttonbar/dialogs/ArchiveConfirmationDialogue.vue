<template>
  <div class="dialog">
    <div class="center">
      <p>{{confirmationQuestion}}</p>
      <button @click="closeDialog(true)" class="tw-btn tw-btn-blue">{{btnMessageOK}}</button>
      <button @click="closeDialog(false)" class="tw-btn tw-btn-blue">{{btnMessageCancel}}</button>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {closeDialog} from 'vue3-promise-dialog'

export default defineComponent({
  props: {
    confirmationQuestion: String,
    btnMessageOK: String,
    btnMessageCancel : String
  },
  setup() {
    function returnValue() {
      return true;
    }
    return {
      returnValue,
      closeDialog
    };
  },
});
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index:100;
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}

.btn {
  margin: 10px;
}
</style>
