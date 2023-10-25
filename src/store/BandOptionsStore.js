import { defineStore,mapStores } from 'pinia'

import axios from "axios";



// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useBandOptionsStore = defineStore('bandOptions', {
    state: () => ({
        bandOptions: [],
    }),
    getters:{
        getBandOptions(state){
            return state.bandOptions
        }
    },
    actions: {
        async fetchBandOptions() {
            try {
                const token = sessionStorage.getItem("token")
                const headers = {
                    "Authorization": token
                };
                axios.get('http://127.0.0.1:8090/api/collections/Band/records?sort=band_id', {headers})
                    .then(response => {
                        for (let i = 0 ; i < response.data.items.length; i++){
                            const bandRecord = response.data.items[i];
                            const band = {id:bandRecord.band_id, label:bandRecord.band_name};
                            this.bandOptions.push(band);
                        }

                    })

            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        getBands(){
            return this.bandOptions;
        }
    },
})

export default {
    computed: {
        // note we are not passing an array, just one store after the other
        // each store will be accessible as its id + 'Store'
        ...mapStores(useBandOptionsStore,['getBands'])
    }
}