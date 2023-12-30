<script lang="ts">
import {ref} from 'vue'
import { VTextField } from 'vuetify/components';
import ValidationStage from "@/components/buttonbar/ValidationStage.ts";


export default {
  extends: VTextField,
  name: "CustomDateInput",

  emits: ['update:modelValue'],
  props: {
   inputFormats:[],
   outputFormat:String,
  },
  computed:{
    formatDate(){

    },
    formatForDisplay(e){
      const innerE = e;
      console.log("innerE.id : " + innerE.id);
    }
  },
  setup(props){
    // watch(() => props.modelValue, (newValue) => {
    //   // do something
    // })
    return {props}
  },
  watch : {
    modelValue(newValue: String, oldValue: String) {
      if (newValue != oldValue) {
        console.log("newValue : " + newValue);
        let formattedValue: String = newValue;
        if (newValue) {
          const spacePlace = newValue.indexOf(" ");
          formattedValue = newValue.substring(0, spacePlace);
        }
        this.props.lazyValue = formattedValue;
        this.$emit("update:modelValue", formattedValue);
      }
    }
  },

  method:{

  }
}
</script>

<template>
  <v-text-field v-bind="$props" v-on="$listeners" >

    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        :slot="slot"
        slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope"/>
    </template>
  </v-text-field>
</template>

<style scoped>

</style>