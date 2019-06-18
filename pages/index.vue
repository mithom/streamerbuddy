<template>
    <div
        :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"
        class="flex flex-col bg-gray-200 font-sans antialiased">

        <!-- the full header component -->
        <Header
            :activeScreen.sync="activeScreen"
        />

        <!-- content area (sidebar + content) -->
        <!-- this should become conditional depending on what is selected in the header -->
        <div class="flex flex-grow">
            <!-- SideBar -->
            <SideBar :is-selected.sync="sidebarSelected"/>

            <!-- content Body -->
            <!-- this should become conditional depending on what is selected in the Sidebar -->
            <ContentBody/>
        </div>
    </div>
</template>

<script>
import SideBar from '~/components/SideBar/SideBar'
import ContentBody from '~/components/ContentBody'
import Header from '~/components/Header'

export default {
  components: {
    SideBar,
    ContentBody,
    Header
  },
  data(){
    return {
      activeScreen: 'Dashboard'
    }
  },
  computed: {
    isMac(){
      return process.platform === 'darwin'
    },
    sidebarSelected:{
      get: function () {
        return this.activeScreen === 'Modules'
      },
      set: function (newVal) {
        if(newVal === true){
          this.activeScreen = 'Modules'
        }else{
          throw new Error('sidebarSelected cannot be set to false')
        }
      }
    }
  }
}
</script>
