<script lang="ts">
import {defineComponent} from 'vue'
import Action from "./Action.ts";
import {Mode} from "././Mode.ts";
import StateEngineClass from "./StateEngineClass.ts";
import ValidationStage from "./ValidationStage";


import {confirm} from './dialogs/dialogs.ts';
import {DialogWrapper} from 'vue3-promise-dialog';


export default defineComponent({
  name: "ButtonBar",
  components: {DialogWrapper},
  props:['validationStage'],
  data(){
    return {
      currentButtonMode : Mode.View,
      confirmArchive:false
    }
  },
  computed: {
    Mode() {
      return Mode
    },
    Action() {
      return Action
    },
  },
  setup(){
    const stateEngine :StateEngineClass = StateEngineClass.getInstance()



    return {stateEngine}
  },
  emits: ['btnAction'],
  watch : {
    validationStage(newState:ValidationStage, oldState:ValidationStage){
      console.log("oldState: "  + ValidationStage[oldState])
      console.log("newState: "  + ValidationStage[newState])
      if (newState === ValidationStage.Success){
        console.log("ButtonBar:btnClick: SaveAction:validation " + !this.validationFailed)
        this.save();
        this.viewMode();
      }
    }
  },
  methods:{

    add: function () {
      this.stateEngine.actionHandler(Action.AddAction);
      this.currentButtonMode = this.stateEngine.getState();

    },
    edit: function () {

      this.stateEngine.actionHandler(Action.EditAction);
      this.currentButtonMode = this.stateEngine.getState();

    },

    viewMode: function(){

    },
    cancel: function(){
      this.stateEngine.actionHandler(Action.CancelAction);
      this.currentButtonMode = this.stateEngine.getState();
    },
    archive: function(){
      this.stateEngine.actionHandler(Action.ArchiveAction);
      this.currentButtonMode = this.stateEngine.getState();
    },
    save: function(){
      this.stateEngine.actionHandler(Action.SaveAction);
      this.currentButtonMode = this.stateEngine.getState();
    },
    clearForm: function(){
      //this.form.clearForm();
    },
    async openConfirmationDialog () {
      const message: string = "'Archiving' a member of staff should only occur when they leave the Trusts permanently. Once this is done no new training can be assigned to them. Do you wish to continue?";
      return await confirm(message, "Continue", "Cancel");
    },
    async archiveIfConfirmed(){
      this.openConfirmationDialog().then((response) => {
        this.confirmArchive = response;
        if (response){
          this.$emit("btnAction", Action.ArchiveAction)
          this.archive();
          this.viewMode();
        }else{
          console.log("Archive Cancelled")
        }
      })

    },

    btnClick: function(action: Action){

      console.log("ButtonBar:btnClick:action: " + action)

      switch(action){
        case Action.AddAction:
        case Action.EditAction:
        case Action.SaveAction:
        case Action.CancelAction:
          //don't send to parent if archiving
          // unless the user confirms
          this.$emit("btnAction", action)
      }

      switch(action){
        case Action.AddAction:
          this.add();
          this.clearForm()
          break;
        case Action.EditAction:
          this.edit();
          break;
        case Action.CancelAction:
          this.cancel();
          this.viewMode();
          break;
        case Action.SaveAction:
          //code triggered by watch
          break;
        case Action.ArchiveAction:
          if (!this.validationFailed) {
            this.archiveIfConfirmed()
          }
          break;

      }

    },

  }
})

</script>

<template>
  <div class="tw-flex tw-justify-between tw-max-w-full">
    <button type="button" class="tw-btn tw-btn-blue disabled:tw-btn-disabled" v-bind:disabled="![Mode.View].includes(this.currentButtonMode)" @click.prevent="btnClick(Action.AddAction)">Add</button>
    <button type="button" class="tw-btn tw-btn-blue disabled:tw-btn-disabled" v-bind:disabled="![Mode.View].includes(this.currentButtonMode)" @click.prevent="btnClick(Action.EditAction)">Edit</button>
    <button type="button" class="tw-btn tw-btn-blue disabled:tw-btn-disabled" v-bind:disabled="[Mode.View].includes(this.currentButtonMode)" @click.prevent="btnClick(Action.CancelAction)">Cancel</button>
    <button type="button" class="tw-btn tw-btn-blue disabled:tw-btn-disabled" v-bind:disabled="[Mode.View].includes(this.currentButtonMode)" @click.prevent="btnClick(Action.SaveAction)">Save</button>
    <button type="button" class="tw-btn tw-btn-red disabled:tw-btn-disabled" v-bind:disabled="[Mode.View,Mode.Add].includes(this.currentButtonMode)" @click.prevent="btnClick(Action.ArchiveAction)">Archive</button>
  </div>
</template>

<style scoped>

</style>