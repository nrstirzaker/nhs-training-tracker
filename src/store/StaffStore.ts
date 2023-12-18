import {defineStore} from 'pinia'
import {basicRequestHeader, getBasicRequestHeader} from "../views/form-utils.ts";
import {DB_URL_ROOT} from "@/Constants.js";
import axios from "axios";
import {useBandListStore} from "@/store/BandListStore";
import { storeToRefs } from 'pinia'

import iStaffEntity from "../declarations/iStaffEntity";






// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useStaffStore = defineStore('staffStore', {
    state: () => ({
        staffListRaw : [],
        staffListDisplayable: []
    }),
    getters: {
        getStaff(state){
            return state.staffListDisplayable.filter((staff) => !staff.archived)
        },
        getStaffRaw(state){
            return state.staffListRaw.filter((staff) => !staff.archived)
        },
        getFormattedStaffById: (state) => {
            return (id:string) => state.staffListDisplayable.find((staff) => staff.id === id)
        },
        getRawStaffById: (state) => {
            return (id:string) => state.staffListRaw.find((staff) => staff.id === id)
        },

    },
    actions: {

        async refresh(callback : Function, id:string) {
            this.staffListRaw = [];
            this.staffListDisplayable = []


            const requestHeader : basicRequestHeader = getBasicRequestHeader();
            await axios.get(DB_URL_ROOT + '/api/collections/Staff/records?filter=(archived=False)&sort=+first_name,last_name', {headers:requestHeader})
                .then(response => {
                    const bandListStore = useBandListStore()
                    const { getBandById } = storeToRefs(bandListStore)

                    for( let i = 0 ; i < response.data.items.length ; i++){
                        const ssoStaff = response.data.items[i];
                        const bandName = getBandById.value(ssoStaff.band_id).name;
                        const staffDisplayable = {
                            id : ssoStaff.id,
                            fullname: ssoStaff.first_name +' ' + ssoStaff.last_name,
                            bandName: bandName,
                            wholeTimeEquivalent: ssoStaff.whole_time_equivalent,
                            substantive: ssoStaff.substantive,
                            onStrength: ssoStaff.on_strength,
                            maternity: ssoStaff.on_maternity_leave,
                            archived:ssoStaff.archived
                        }

                        const staffRaw = {
                            id : ssoStaff.id,
                            firstName: ssoStaff.first_name,
                            lastName: ssoStaff.last_name,
                            bandId: ssoStaff.band_id,
                            wholeTimeEquivalent: ssoStaff.whole_time_equivalent,
                            substantive: ssoStaff.substantive,
                            onStrength: ssoStaff.on_strength,
                            maternity: ssoStaff.on_maternity_leave,
                            archived:ssoStaff.archived
                        }

                        this.staffListDisplayable.push(staffDisplayable);
                        this.staffListRaw.push(staffRaw);

                    }
                    if (callback && id){
                        callback(id)
                    }

                })


        },
        async update(record: iStaffEntity, callback:Function) {
            const requestHeader : basicRequestHeader = getBasicRequestHeader();
            axios.patch(DB_URL_ROOT + '/api/collections/Staff/records/' + record.id, record, {headers: requestHeader})
                .then(response => {
                    this.refresh(callback,response.data.id);
                }).catch(error => {
                console.log(error)
            })
        },
        async save (record:iStaffEntity, callback:Function) {

            const requestHeader : basicRequestHeader = getBasicRequestHeader();

            axios.post(DB_URL_ROOT + '/api/collections/Staff/records', record, {headers: requestHeader})
                .then(response => {
                    this.refresh(callback,response.data.id);
                }).catch(error => {
                console.log(error)
            })
        },
        // async get(id:string,callback:Function) {
        //
        //     if (id) {
        //         const staff:iStaffEntity = this.getStaffById(id);
        //         console.log("updates:staff: " + JSON.stringify(staff));
        //         callback(staff);
        //     } else {
        //         const staff:iStaffEntity = this.staffListRaw[0];
        //         console.log("insert:staff: " + JSON.stringify(staff));
        //         callback(staff);
        //
        //     }
        // }



    }
})
