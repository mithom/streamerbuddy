<template>
    <Modal
        name="moduleStore"
        width="75%"
        height="75%"
        :classes="['bg-white', 'rounded-lg', 'shadow-2xl', 'p-0', 'text-left', 'overflow-auto']"
        @before-open="getModuleStoreData"
        @closed="$store.commit('moduleStore/clearStore')"
    >
        <!--  -->
        <!--        <div class="overflow-auto h-full">-->
        <div
            v-for="(modules, cat) in data"
            :key="cat"
        >
            <h1 class="font-bold text-2xl px-4 pt-2">
                {{ cat }}
            </h1>
            <div
                v-for="(components, module) in modules"
                :key="cat +'_'+ module"
                class="inline-block p-4 bg-grey-300 shadow-inner"
            >
                <h2 class="font-bold text-xl">
                    {{ module }}
                </h2>
                <p>Nb component: {{ components | count }}</p>
                <InstallButton>
                    Install
                </InstallButton>
            </div>
        </div>
        <!-- top-right slot is hidden behind titlebar - absolute vs fixed positioned + overflow-auto scroll-height vs height issue -->
        <CloseButton @click="$modal.hide('moduleStore')" />

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
        <!--        </div>-->
    </Modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Mikepad from '../parts/Mikepad'
import CloseButton from "../parts/CloseButton";
import {mapState, mapActions} from 'vuex'
import InstallButton from "../parts/InstallButton";

export default {
  name: "StoreModal",
  components:{
    InstallButton,
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
