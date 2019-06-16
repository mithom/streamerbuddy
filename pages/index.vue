<template>
    <div
        :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"
        class="flex flex-col bg-gray-200 font-sans antialiased">

        <!-- the full header component -->
        <Header/>

        <!-- content area (sidebar + content) -->
        <!-- this should become conditional depending on what is selected in the header -->
        <div class="flex flex-grow">
            <!-- SideBar -->
            <SideBar/>

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
      platform: process.platform
    }
  },
  computed: {
    isMac(){
      return this.$store.state.platform === 'darwin'
    }
  }
}
</script>
