<template>
    <!--    :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"-->
    <div

        class="flex flex-col bg-gray-200 font-sans antialiased h-full"
    >
        <StoreModal />
        <ConnectionsManager />
        <!-- the full header component -->
        <Header />

        <!-- content area (sidebar + content) -->
        <!-- this should become conditional depending on what is selected in the header -->
        <div
            class="flex flex-grow"
        >
            <template
                v-for="tab in screens"
            >
                <Component
                    :is="tab"
                    :key="tab"
                    :class="{hidden: tab !== activeScreen}"
                />
            </template>
        </div>
    </div>
</template>

<script>
import Header from '~/components/Header'
import StoreModal from "~/components/ModuleStore/StoreModal";
import Dashboard from "~/components/content/Dashboard/Dashboard"
import Modules from "~/components/content/Modules/Modules"
import Extras from "~/components/content/Extras/Extras";
import Commands from "~/components/content/Commands/Commands";
import Timers from "~/components/content/Timers/Timers";
import {mapState} from 'vuex'
import ConnectionsManager from "~/components/ConnectionsManager/ConnectionsManager";

export default {
  components: {
    ConnectionsManager,
    StoreModal,
    Header,
    Dashboard,
    Modules,
    Extras,
    Commands,
    Timers,
  },
  computed: {
    ...mapState(['activeScreen', 'screens']),
    isMac(){
      return process.platform === 'darwin'
    }
  },
  async asyncData({store}){
    //wait with rendering until old state has been loaded
    if(!store.state.stateLoaded){
      const done = new Promise((resolve,reject)=>{
        const unsub = store.subscribe((mutation)=>{
          if(mutation.type === 'RESTORE_MUTATION'){
            store.commit('finishStateLoading')
            console.log('done hydrating store')
            resolve()
            unsub()
          }
        })
      })
      await done
    }
  }
}
</script>
