<script >
import {defineComponent, onMounted} from 'vue'
import axios from "axios";
import {getAuthHeader} from "./form-utils.js";
import {Field, Form, ErrorMessage} from 'vee-validate';
import {useBandOptionsStore} from "../store/BandOptionsStore.js";
import {sidebarWidth} from "../components/sidebar/state.js";


export default defineComponent({
  name: "Staff",
  components: {
    Form, Field, ErrorMessage
  },
  data: function () {
    return {
      firstName: "",
      lastName: "",
      WTE: null,
      bandId: null,
      substantive: true,
      onStrength: true,
      canBeArchived: true,
      onMaternityLeave: false,
    }
  },
  setup() {
    onMounted(() => {

    })
    const bandOptionsStore = useBandOptionsStore()

    return { sidebarWidth, bandOptionsStore }


  },
  methods: {

    addStaff: function (event) {
      event.preventDefault();
      const authData = getAuthHeader();
      const headers = {
        "Authorization": authData
      };
      const data = this.collateData();
      axios.post('http://127.0.0.1:8090/api/collections/Staff/records', data, {headers})
          .then(response => console.log(response))
    },
    collateData: function () {
      const data = {
        first_name: this.form.firstName,
        family_name: this.form.lastName,
        on_strength: this.form.onStrength,
        archived: this.form.archived,
        band_id: this.form.bandId,
        WTE: this.form.WTE,
        substantive: this.form.substantive,
        on_maternity_leave: this.form.onMaternityLeave
      }
      return data;
    },
    getBands : function(){
      //.getBandOptions();
      const records = this.bandOptionsStore.getBands();
      //const records = [];
      const bands = [];

      records.forEach((items) =>{
        bands.push({id:items.id,label:items.label})
      })
      return bands;
    }
  }
})

</script>

<template>
  <div class="max-w-full bg-green-700 ">
  <h1>Staff</h1>
  <Form @submit.prevent="addStaff">
    <div class="grid grid-cols-4 gap-x-5 gap-y-4 grid-flow-row-dense" >

      <div class="inputItem">
        <div class="inputLabel"><span>First Name * <ErrorMessage name="firstName"/></span></div>
        <Field class="fieldText block" v-model="firstName" name="firstName" type="text" rules="required" placeholder="First Name"/>
      </div>

      <div class="inputItem">
        <div class="inputLabel"><span>Last Name *<ErrorMessage name="lastName"/></span></div>
        <Field class="fieldText block" v-model="lastName" name="lastName" type="text" rules="required" placeholder="Last Name"/>
      </div>

      <div class="inputItem">
        <div class="inputLabel"><span>WTE *<ErrorMessage name="WTE"/></span></div>
        <Field class="fieldNumber block" v-model="WTE" name="WTE" type="text" rules="required" placeholder="WTE"/>
      </div>

      <div class="inputItem">
        <div class="inputLabel"><span>Band *<ErrorMessage name="bandId"/></span></div>
        <Field class="fieldSelect block" v-model="bandId" name="bandId" as="select"  rules="required" placeholder="Band">
          <option v-for="band in this.getBands()" :key="band.id" :value="band.label" >{{ band.label }}</option>
        </Field>
      </div>

      <div class="inputItem">
        <div class="inputLabel">
          <span>Substantive *<ErrorMessage name="substantive"/></span>

          <span class="float-right">
            Yes <Field name="substantive" type="radio" rules="required" value="true" />
            No <Field name="substantive" type="radio" rules="required" value="false" />
          </span>
        </div>
      </div>

      <div class="inputItem">
        <div class="inputLabel inputCheckBoxLabel">Maternity?
          <span class="float-right">
            <Field class="float-right" name="maternity" type="checkbox" value="true" />
          </span>
        </div>
      </div>

      <div class="inputItem">
        <div class="inputLabel inputCheckBoxLabel">On Strength?
          <span class="float-right">
            <Field class="float-right" name="onStrength" type="checkbox" value="true" />
          </span>
        </div>
      </div>


    </div>
    <div class="flex justify-between max-w-full">
    <button type="button" class="btn btn-blue">Add</button>
    <button type="button" class="btn btn-blue">Cancel</button>
    <button type="button" class="btn btn-red">Archive</button>
    </div>
  </Form>
  </div>
</template>

<style scoped>

</style>