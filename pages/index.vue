<template>
    <!--    :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"-->
    <div

        class="flex flex-col bg-gray-200 font-sans antialiased h-full"
    >
        <ComponentPicker />
        <StoreModal />
        <Profile />
        <ConnectionManager />
        <!-- the full header component -->
        <Header />

        <!-- content area (sidebar + content) -->
        <!-- this should become conditional depending on what is selected in the header -->
        <div
            class="flex flex-grow overflow-y-auto"
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
import ConnectionManager from "~/components/ConnectionManager/ConnectionManager";
import ComponentPicker from "../components/content/Dashboard/ComponentPicker";
import Profile from '../components/Profile/Profile'

export default {
  components: {
    ComponentPicker,
    ConnectionManager,
    Profile,
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
    await store.restored
  }
}
</script>
