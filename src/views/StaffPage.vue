<script lang="ts">
import {defineComponent} from 'vue'
import {useBandListStore} from "../store/BandListStore";
import {sidebarWidth} from "../components/sidebar/state";
import staffListGrid from "../components/StaffListGrid.vue";
import ButtonBar from "../components/buttonbar/ButtonBar.vue";
import Action from "../components/buttonbar/Action";
import {isNumeric, isAlpha} from '@/lib/ValidationUtils.js';
import {storeToRefs} from 'pinia'


import {Band} from "../store/Band.ds";
import iStaffEntity from "@/declarations/iStaffEntity.d";
import ValidationStage from "@/components/buttonbar/ValidationStage.js";
import {useStaffStore} from "@/store/StaffStore";
import iRawStaffDTO from "@/declarations/iRawStaffDTO.d.ts";


export default defineComponent({

  name: "StaffPage",
  computed: {
    btnAction() {
      return Action
    },
    getValidationStage() {
      return this.validationStage
    }
  },
  components: {
    ButtonBar,
    staffListGrid
  },
  data() {
    return {
      validationStage: ValidationStage.None,
      requiredRule: [
        value => {
          if (value != null) return true
          return 'This field is required.'
        },

      ],
      alphaOnlyRule: [
        value => {
          if (isAlpha(value)) return true
          return 'Only letters allowed'
        }
      ],
      numericOnlyRule: [
        value => {
          if (isNumeric(value)) return true
          return 'Only numeric values allowed'
        }],
      wteRange: [
        value => {
          if (isNumeric(value)) {
            const wteValue: number = Number(value);
            if (wteValue > 0 && wteValue <= 1) return true;
            return 'WTE must be greater than 0 and also less than or equal to 1'
          }

        }
      ],
      recordIdForDataSession: "",
      isReadonly: true,
      form: {
        id: "",
        firstName: "",
        lastName: "",
        wholeTimeEquivalent: null,
        bandId: null,
        substantive: null,
        onStrength: null,
        onMaternityLeave: null,
        archived: false
      }
    }
  },
  mounted: function () {
    const unsubscribe = this.staffStore.$onAction(
        ({
           name, // name of the action
           store, // store instance, same as `someStore`
           args, // array of parameters passed to the action
           after, // hook after the action returns or resolves
           onError, // hook if the action throws or rejects
         }) => {

          after(() => {
            if (name === 'refresh') {
              const id: string = this.recordIdForDataSession || this.form.id;
              this.displayOnRefresh(id)
            }

          });
        }
    )
    this.staffStore.refresh();


  },
  created: function () {


  },
  setup() {

    const bandListStore = useBandListStore()
    bandListStore.load();

    const staffStore = useStaffStore()
    const {getRawStaffById, getFormattedStaffById} = storeToRefs(staffStore)

    return {sidebarWidth, staffStore, bandListStore, staffListGrid, getRawStaffById,getFormattedStaffById}

  },

  methods: {
    displayOnRefresh(id:string) {

      let staff:iRawStaffDTO = this.getRawStaffById(id);
      if (!staff) {
        staff = this.staffStore.getStaffRaw[0]
      }
      this.loadForm(staff);
      this.$refs.staffListGrid.update(staff.id)

    },
    loadForm: function (data: iRawStaffDTO) {
      this.form.id = data.id
      this.form.firstName = data.firstName;
      this.form.lastName = data.lastName;
      this.form.wholeTimeEquivalent = data.wholeTimeEquivalent ? data.wholeTimeEquivalent.toString() : "0";
      this.form.bandId = data.bandId;
      this.form.substantive = !!data.substantive;
      this.form.onStrength = !!data.onStrength;
      this.form.onMaternityLeave = !!data.onMaternityLeave;
      this.form.archived = !!data.archived;

    },
    collateData: function () : iStaffEntity {
      return {
        id: this.form.id,
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        band_id: this.form.bandId,
        whole_time_equivalent: this.form.wholeTimeEquivalent,
        substantive: !!this.form.substantive,
        on_strength: !!this.form.onStrength,
        on_maternity_leave: !!this.form.onMaternityLeave,
        archived: false,
      };
    },
    getBands: function () {
      const records = this.bandListStore.allActiveBands;

      const bands: Band[] = [];

      records.forEach((record: iStaffEntity) => {
        bands.push({band_id: record.band_id, name: record.name})
      })
      return bands;
    },

    clear: function () {
      this.$refs.staffForm.reset();
    },
    update: function () {
      const record: iStaffEntity = this.collateData();
      this.staffStore.update(record, this.displayOnRefresh)
    },
    save: function () {
      const record: iStaffEntity = this.collateData();
      this.staffStore.save(record, this.displayOnRefresh)
    },
    makeFormEditable: function () {
      this.isReadonly = false;
    },
    makeFormReadonly: function () {
      this.isReadonly = true;
    },
    loadRecord: function (item) {
      const staff: iRawStaffDTO = this.getRawStaffById(item.id);
      this.loadForm(staff);
    },
    btnActionHandler: function (action: Action) {
      this.validationStage = ValidationStage.None
      switch (action) {
        case Action.AddAction: {
          this.recordIdForDataSession = "";
          this.clear();
          this.makeFormEditable();
          break;
        }
        case Action.EditAction: {
          this.recordIdForDataSession = this.form.id;
          this.makeFormEditable();
          break;
        }
        case Action.CancelAction: {
          const staff:iRawStaffDTO = this.getRawStaffById(this.recordIdForDataSession);
          this.loadForm(staff);
          this.makeFormReadonly();
          break;
        }
        case Action.SaveAction: {
          console.log("Staff:btnActionHandler: SaveAction")
          this.$refs.staffForm.validate().then((response) => {
            console.log("response.valid:" + response.valid);
            console.log("response.errors:" + response.errors);
            if (!response.valid) {

              console.log("Staff:btnActionHandler: SaveAction: is Not Valid")
              this.validationStage = ValidationStage.Failed


            } else {

              console.log("Staff:btnActionHandler: SaveAction: is Valid")
              this.validationStage = ValidationStage.Success
              const idOfCurrentRecord = this.recordIdForDataSession;
              if (idOfCurrentRecord) {
                this.update()
              } else {
                this.save();
              }

              this.makeFormReadonly();

            }
          });
          break;
        }
        case Action.ArchiveAction: {
          //message/warning
          this.goToNextorLastStaffMember();
          this.makeFormReadonly();
          break;
        }

      }
    }

  }
})

</script>

<template>
  <div class="tw-max-w-full ">
    <h1>Staff</h1>
    <v-form ref="staffForm" validate-on="blur" :readonly="this.isReadonly">

      <ButtonBar @btn-action="btnActionHandler" v-bind:validationStage="this.getValidationStage"/>
      <!--v-bind:state-engine="buttonStateEngine" />-->


      <div>
        <v-text-field v-model="form.id" name="id" type="text"/>
      </div>


      <div class="tw-grid tw-grid-cols-2 tw-gap-x-5 tw-gap-y-4 tw-grid-flow-row-dense">

        <div class="inputItem">
          <div class="tw-inputLabel"><span>First Name * </span></div>
          <v-text-field class="fieldText block" v-model="form.firstName" name="firstName" type="text"
                        :rules="[...this.requiredRule, ...this.alphaOnlyRule]"
                        placeholder="First Name"/>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel"><span>Last Name *</span></div>
          <v-text-field class="fieldText block" v-model="form.lastName" name="lastName" type="text"
                        :rules="[...this.requiredRule,...this.alphaOnlyRule]"
                        placeholder="Last Name"/>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel"><span>WTE *</span></div>
          <v-text-field class="tw-fieldNumber block" v-model="form.wholeTimeEquivalent" name="wholeTimeEquivalent"
                        type="text" :rules="[...this.requiredRule, ...this.numericOnlyRule,...this.wteRange]"
                        placeholder="WTE"/>
        </div>

        <div class="tw-inputItem ">
          <div class="tw-inputLabel"><span>Band *</span></div>
          <v-select class="tw-fieldSelect block pa-0 ma-0" v-model="this.form.bandId" name="bandId"
                    :items="this.getBands()"
                    :rules="this.requiredRule" item-value="band_id"
                    item-title="name" placeholder="Band"/>
        </div>
      </div>

      <div class="tw-grid tw-grid-cols-3 tw-gap-x-5 tw-gap-y-4 tw-grid-flow-row-dense">

        <div class="tw-inputItem">
          <div class="tw-inputLabel">Substantive *</div>
          <v-container>
            <v-radio-group v-model="form.substantive" inline :readonly="this.isReadonly" :rules="this.requiredRule">
              <v-radio label="Yes" :value=true></v-radio>
              <v-radio label="No" :value=false></v-radio>
            </v-radio-group>
          </v-container>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel">On Strength?</div>
          <v-checkbox class="float-left" v-model="form.onStrength" :readonly="this.isReadonly"></v-checkbox>
        </div>

        <div class="tw-inputItem">
          <div class="tw-inputLabel">Maternity?</div>
          <v-checkbox class="float-left" v-model="form.onMaternityLeave" :readonly="this.isReadonly"></v-checkbox>
        </div>

      </div>

    </v-form>
    <staffListGrid ref="staffListGrid" @row-select-action="loadRecord"/><!--v-on:click.native="loadRecord"/>-->
  </div>
</template>

<style scoped>


</style>