<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import axios from "axios";
import {getBasicRequestHeader} from "./form-utils.ts";
import {useBandOptionsStore} from "../store/BandOptionsStore.js";
import {sidebarWidth} from "../components/sidebar/state.ts";
import staffListGrid from "../components/StaffListGrid.vue";
import {required} from "./form-validators.ts";
import ButtonBar  from "../components/buttonbar/ButtonBar.vue";
import {Action}  from "../components/buttonbar/Action.ds.ts";



export default defineComponent({
  name: "Staff",
  components: {
    ButtonBar,
    staffListGrid
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        WTE: null,
        bandId: null,
        substantive: true,
        onStrength: true,
        canBeArchived: true,
        onMaternityLeave: false
      },
      bands: this.bandOptionsStore.getBands().map(function (band) {
        return {text: band.label, value: band.id}
      })

    }
  },
  setup() {
    onMounted(() => {

    })
    const bandOptionsStore = useBandOptionsStore()

    return {sidebarWidth, bandOptionsStore, staffListGrid}


  },
  methods: {
    required,

    getStaffById(id) {
      const requestHeader = getBasicRequestHeader();
      axios.get('http://127.0.0.1:8090/api/collections/Staff/records/' + id, {headers: requestHeader})
          .then(response => {
            this.form.firstName = response.data.first_name;
            this.form.lastName = response.data.last_name;
            this.form.WTE = response.data.WTE.toString();
            this.form.bandId = response.data.band_id;
            this.form.substantive = response.data.substantive.toString();
            this.form.onMaternityLeave = response.data.on_maternity_leave.toString();
            this.form.onStrength = response.data.on_strength.toString();

          }).catch(error => {
        console.log(error)
      })

    },
    collateData: function () {
      const data = {
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        on_strength: this.form.onStrength,
        archived: this.form.archived,
        band_id: 'egh9tddhtegz7kz',
        WTE: this.form.WTE,
        substantive: this.form.substantive,
        on_maternity_leave: this.form.onMaternityLeave
      }
      return data;
    },
    getBands: function () {
      const records = this.bandOptionsStore.getBands();

      const bands = [];

      records.forEach((items) => {
        bands.push({id: items.id, label: items.label})
      })
      return bands;
    },

    clearForm: function () {
      this.$refs.staffForm.resetForm();
    },
    updateStaff: function (id) {

    },
    loadRecord: function (event) {

      if (event.target.parentElement.className === 'v-data-table__tr') {
        const recordId = event.target.parentElement.children[0].innerText;
        this.getStaffById(recordId);

      }

    },
    actionHandler : function(action: Action){
      console.log("action:" + action);
    }

  }
})

</script>

<template>
  <div class="tw-max-w-full ">
    <h1>Staff</h1>
    <v-form  ref="staffForm" @action="actionHandler">

      <ButtonBar  />

      <div class="tw-grid tw-grid-cols-2 tw-gap-x-5 tw-gap-y-4 tw-grid-flow-row-dense">


        <div class="inputItem">
          <div class="tw-inputLabel"><span>First Name * </span></div>
          <v-text-field class="fieldText block" v-model="form.firstName" name="firstName" type="text" :rules="required()" placeholder="First Name"/>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel"><span>Last Name *</span></div>
          <v-text-field class="fieldText block" v-model="form.lastName" name="lastName" type="text" :rules="required()" placeholder="Last Name"/>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel"><span>WTE *</span></div>
          <v-text-field class="tw-fieldNumber block" v-model="form.WTE" name="WTE" type="text" :rules="required()" placeholder="WTE"/>
        </div>

        <div class="tw-inputItem ">
          <div class="tw-inputLabel"><span>Band *</span></div>
          <v-select class="tw-fieldSelect block pa-0 ma-0" v-model="this.form.bandId" name="bandId" :items="this.getBands()" item-value="id"
                    item-title="label" placeholder="Band"/>
        </div>
      </div>

      <div class="tw-grid tw-grid-cols-3 tw-gap-x-5 tw-gap-y-4 tw-grid-flow-row-dense">

        <div class="tw-inputItem">
          <div class="tw-inputLabel">Substantive *</div>
          <v-radio-group v-model="form.substantive" inline>
            <v-radio label="Yes" :rules="required()" value="true"></v-radio>
            <v-radio label="No" :rules="required()" value="false"></v-radio>
          </v-radio-group>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel">Maternity?</div>
          <v-checkbox class="float-left" v-model="form.onMaternityLeave" name="maternity"  value="true"></v-checkbox>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel">On Strength?</div>
          <v-checkbox class="float-left" v-model="form.onStrength" name="onStrength" value="true"></v-checkbox>
        </div>


      </div>

    </v-form>
    <staffListGrid ref="staffListGrid" v-on:click.native="loadRecord"/>
  </div>
</template>

<style scoped>


</style>