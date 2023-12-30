import {defineStore} from 'pinia'
import {Band} from "./Band.ds";



// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useBandListStore = defineStore('bandListStore', {
    state: () => ({
        allBandsList: [] as Band[],
        nonDeprecatedBandsList: [] as Band[],
        loaded:false
    }),
    getters: {
        allBands : (state) => state.allBandsList,
        allActiveBands : (state) => state.nonDeprecatedBandsList,
        getBandById : (state) => {
            return (bandId : number) => state.allBandsList.find((band) => band.band_id === bandId)
        },
        isLoaded:(state) => state.loaded == true
    },
    actions: {
        async load() {
            const wholeBandList = (await import("@/static-data/bands.json")).default;

            this.allBandsList = wholeBandList;
            this.allBandsList.sort((a,b) => (a.display_order > b.display_order) ? 1 : ((b.display_order > a.display_order ? -1 : 0)) )


            this.nonDeprecatedBandsList = wholeBandList.filter(band  => band.deprecated == false);
            this.nonDeprecatedBandsList.sort((a,b) => (a.display_order > b.display_order) ? 1 : ((b.display_order > a.display_order ? -1 : 0)) )
            this.loaded = true;

        }

    }
})

