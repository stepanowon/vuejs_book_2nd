<template>
    <div>
        <button class="region" v-for="region in regions" :key="region"
            v-bind:class="isSelected(region)"
            @click="changeRegion({region:region})">
            {{region}}
        </button>
    </div>
</template>

<script>
import Constant from '../Constant'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name : "RegionButtons",
    computed : mapGetters([
            'regions', 'currentRegion'
    ]),
    // computed : {
    //     regions() {
    //         return this.$store.getters.regions;
    //     },
    //     currentRegion() {
    //         return this.$store.getters.currentRegion;
    //     }
    // },
    methods : {
        isSelected(region) {
            if (region == this.currentRegion)  return { selected: true };
            else return { selected:false }
        },
        ...mapMutations([ 
            Constant.CHANGE_REGION 
        ])
    }
}
</script>

<style>
    button.region { text-align: center; width:80px; margin:2px; border:solid 1px gray;  }
    button.selected { background-color:purple; color:aqua; }
</style>
