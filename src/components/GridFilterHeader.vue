<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GridFilterHeader",
  props:["headers"],
  setup(props){
    //remove id colum for header
    const visibleHeaders = props.headers.slice(1);

    return {visibleHeaders}
  },
  data(){
    return {
      filterValues: {}
    }
  }
})
</script>
<!--    v-slot:[`header.${header.value}`]="{ }"-->
<template>



  <div class="tw-grid tw-grid-cols-5 tw-gap-x-1 tw-gap-y-1 tw-grid-flow-row-dense">
    <section  v-for="(header, key, index) in visibleHeaders" >
      <div v-if="header.filterable">
        {{ header.title }}
        <!--<div @click.stop :key="key" class="mdi-form-textbox">-->
        <div class="inputItem">
          <v-responsive :width='header.width'>

            <v-text-field
                class="fieldText block"
                :key="key"
                v-model="filterValues[header.value]"
                type="text"
                :placeholder="header.value"

            ></v-text-field>
          </v-responsive>
        </div>
      </div>
    </section>
  </div>


</template>

<style scoped>


</style>