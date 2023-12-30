<script lang="ts">
import {defineComponent} from 'vue'


import {
  VDataTable,
} from "vuetify/labs/VDataTable";

import {useBandListStore} from "@/store/BandListStore";
import {useStaffStore} from "@/store/StaffStore";
import iStaffDTO from "@/declarations/iRawStaffDTO.d.ts";
import {formatDateToDisplay} from '@/lib/FormatUtils.js'
import GridFilterHeader from "@/components/GridFilterHeader.vue";



export default defineComponent({
  name: "staffListGrid",

  components: {
    VDataTable,GridFilterHeader
  },

  mounted() {
    this.staff.push(this.staffStore.getStaff );
  },
  setup() {

    const bandListStore = useBandListStore()
    const staffStore = useStaffStore()
    const formatStartDate = ((date) => {
      return formatDateToDisplay(date,"")
    });

    return {bandListStore, staffStore,formatStartDate}

  },
  expose: ["refresh","update"],
  emits: ['rowSelectAction'],
  methods: {
    rowClick: function (item:iStaffDTO) {
      const indexOf = this.selected.indexOf(item.id);
      if (indexOf === -1){
        this.$emit("rowSelectAction", item)
        this.selected = []
        this.selected.push(item.id)

      }

    },

    refresh: function () {

      this.staff = []
      this.staff.push( this.staffStore.getStaff )
      this.selected = []
      this.selected.push(this.staffStore.getStaff[0].id)

    },
    update: function (id:string) {

      this.staff = []
      this.staff.push( this.staffStore.getStaff )
      this.selected = []
      this.selected.push(id)

    }
  },
  data:() =>( {

      selectedRowId: "-1",
      itemsPerPage: 5,
      headers: [
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
          width: "150px",

        },
        {title: 'Start Date', align: 'center', key: 'startDate', width: "150px"},
        {title: 'Band', align: 'center', key: 'bandName', width: "150px"},
        {title: 'WTE', align: 'center', key: 'wholeTimeEquivalent'},
        {title: 'On Strength', align: 'center', key: 'onStrength'},
        {title: 'Substantive', align: 'center', key: 'substantive'},
        {title: 'Maternity', align: 'center', key: 'maternity'}


      ],
      staff: [],
      selected: []


    })

})
</script>

<template>
  <GridFilterHeader v-bind:headers="headers"/>
  <v-app>
    <v-data-table
        :headers="headers"
        :items=this.staffStore.getStaff
        class="elevation-1"

    >

      <template v-slot:item="{item}">

        <tr  @click="rowClick(item)" v-bind:class="this.selected.includes(item.id) ? 'custom-highlight-row' : ''">

          <td>{{ item.fullname }}</td>
          <td>{{ this.formatStartDate(item.startDate) }}</td>
          <td>{{ item.bandName }}</td>
          <td>{{ item.wholeTimeEquivalent }}</td>
          <td>{{ item.substantive }}</td>
          <td>{{ item.onStrength }}</td>
          <td>{{ item.maternity }}</td>
        </tr>

      </template>
    </v-data-table>
  </v-app>
</template>

<style scoped>

</style>
