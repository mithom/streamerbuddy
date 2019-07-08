<template>
    <Modal
        name="moduleStore"
        width="75%"
        height="75%"
        @before-open="loadStore"
    >
        <div class="overflow-auto h-full">
            <div
                v-for="obj in data.tree"
                :key="obj.path"
            >
                {{ obj.path }}
            </div>
            <!-- top-right slot is hidden behind titlebar - absolute vs fixed positioned + overflow-auto scroll-height vs height issue -->
            <CloseButton @click.native="$modal.hide('moduleStore')" />

            <loading
                :active="isLoading"
                :can-cancel="false"
                :is-full-page="false"
                :height="100"
                :width="100"
                :opacity="0.7"
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
import {getAvailableModuleFolders} from '~/app/module-installer'
import CloseButton from "../parts/CloseButton";

export default {
  name: "StoreModal",
  components:{
    CloseButton,
    Loading,
    Mikepad,
  },
  data(){
    return {
      data: {}
    }
  },
  computed:{
    isLoading(){
      return this.$store.state.moduleStore.isLoading
    }
  },
  methods:{
    loadStore: async function(){
      this.$store.commit('moduleStore/startLoading')
      this.data = await getAvailableModuleFolders(this.$store.state, this.$store.dispatch)
      this.$store.commit('moduleStore/doneLoading')
    },
  }
}
</script>

<style>
/* https://www.npmjs.com/package/vue-js-modal for modal usage and styling*/
</style>
