<script lang="ts">
import {defineComponent} from 'vue'

import {
  VDataTableServer,
} from "vuetify/labs/VDataTable";
import  { getBasicRequestHeader, type basicRequestHeader} from "../views/form-utils";
import axios from "axios";

export interface iStaffListGrid{

}

export default defineComponent ( {
  name: "staffListGrid",
  components: {
    VDataTableServer,
  },
  mounted(){
    this.getStaffListData();
  },
  expose:['getStaffListData'],
  methods:{
    getStaffListData: function(){

      const requestHeader : basicRequestHeader = getBasicRequestHeader();

      axios.get("http://127.0.0.1:8090/api/collections/Staff/records?filter=(archived=False)", {headers:requestHeader})
          .then(response => {
            const temp = [];
            for( let i = 0 ; i < response.data.items.length ; i++){
              const ssoStaff = response.data.items[i];
              const clientStaff = {
                id : ssoStaff.id,
                fullname: ssoStaff.first_name +' ' + ssoStaff.last_name,
                onStrength: ssoStaff.on_strength,
                bandId: ssoStaff.band_id,
                wte: ssoStaff.WTE,
                substantive: ssoStaff.substantive,
                maternity: ssoStaff.maternity,
              }
              temp.push(clientStaff);
            }
            this.staff = temp;
          })
    }

  },
  data(){
    return {
      itemsPerPage :5,
      headers:[
        {
          title: 'id',
          align: ' d-none',
          sortable: false,
          key: 'id',
        },
        {
          title: 'Fullname',
          align: 'left',
          sortable: true,
          key: 'fullname',
          width:"150px",

        },
        { title: 'Band', align: 'center', key: 'bandName', width:"150px" },
        { title: 'WTE', align: 'center', key: 'wte' },
        { title: 'On Strength', align: 'center', key: 'onStrength' },
        { title: 'Substantive', align: 'center', key: 'substantive' },
        { title: 'Maternity', align: 'center', key: 'maternity' },
        { title: 'Maternity', align: 'center', key: 'maternity' },


      ],
      staff :[
      ]

    }
  }
})
</script>

<template>
  <v-app>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="this.headers"
        :items=this.staff
        v-model=this.staff
        :itemsLength=this.staff.length
        item-value="name"
        class="elevation-1"
        update:modelValue=this.getStaffListData
    ></v-data-table-server>
  </v-app>
</template>

<style scoped>

</style>