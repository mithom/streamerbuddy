<template>
    <div
        :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"
        class="flex flex-col bg-gray-200 font-sans antialiased"
    >
        <StoreModal />
        <!-- the full header component -->
        <Header />

        <!-- content area (sidebar + content) -->
        <!-- this should become conditional depending on what is selected in the header -->
        <div class="flex flex-grow">
            <!-- SideBar -->
            <SideBar />

            <!-- content Body -->
            <!-- this should become conditional depending on what is selected in the Sidebar -->
            <ContentBody />
        </div>
    </div>
</template>

<script>
import SideBar from '~/components/SideBar/SideBar'
import ContentBody from '~/components/content/ContentBody'
import Header from '~/components/Header'
import StoreModal from "../components/ModuleStore/StoreModal";

export default {
  components: {
    StoreModal,
    SideBar,
    ContentBody,
    Header
  },
  computed: {
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
