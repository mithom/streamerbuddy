<template>
    <Modal
        name="moduleStore"
        width="75%"
        height="75%"
        @before-open="getModuleStoreData"
        @closed="$store.commit('moduleStore/clearStore')"
    >
        <div class="overflow-auto h-full pb-4">
            <div
                v-for="(modules, cat) in data"
                :key="cat"
            >
                <h1 class="font-bold text-2xl px-4 mt-2">
                    {{ cat }}
                </h1>
                <ModuleTile
                    v-for="(components, module) in modules"
                    :key="cat +'_'+ module"
                    :module="module"
                    :category="cat"
                    :components="components"
                />
            </div>
            <!-- top-right slot is hidden behind titlebar - absolute vs fixed positioned + overflow-auto scroll-height vs height issue -->
            <CloseButton @click.native="$modal.hide('moduleStore')" />

            <loading
                :active="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                :height="100"
                :width="100"
                :opacity="0.9"
                background-color="#cbd5e0"
            >
                <Mikepad />
            </loading>
        </div>
    </Modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Mikepad from '../parts/Mikepad'
import CloseButton from "../parts/CloseButton";
import {mapState, mapActions} from 'vuex'
import ModuleTile from "./ModuleTile";

export default {
  name: "StoreModal",
  components:{
    ModuleTile,
    CloseButton,
    Loading,
    Mikepad,
  },
  computed:{
    ...mapState({
      isLoading: state=> state.moduleStore.isLoading,
      data: state=> state.moduleStore.gitTree,
    })
  },
  methods:{
    ...mapActions({getModuleStoreData: 'moduleStore/getModuleStoreData'}),
  }
}
</script>

<style scoped>
    /* https://www.npmjs.com/package/vue-js-modal for modal usage and styling*/
</style>
