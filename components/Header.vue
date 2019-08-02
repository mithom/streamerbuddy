<template>
    <!-- start header -->
    <div
        class="flex bg-blue-700 px-8 justify-between items-center flex-shrink-0"
    >
        <!-- left header -->
        <div class="flex text-white items-center">
            <div
                class="logo text-2xl mr-8 w-10 h-10 bg-white text-blue-1000 rounded-full text-center"
            >
                SB
            </div>
            <nav>
                <ul class="flex text-sm uppercase font-semibold">
                    <HeaderButton
                        v-for="button in screens"
                        :key="button"
                        :active="button === activeScreen"
                        @click.native="activate(button)"
                    >
                        {{ button }}
                    </HeaderButton>
                </ul>
            </nav>
        </div>
        <!-- end left header -->
        <!-- right header -->
        <div class="flex justify-end items-center text-white">
            <div class="flex mr-2 cursor-pointer">
                <Notifications />
                <StoreButton @click.native="showStore" />
                <InformationButton />
            </div>
            <dropdown-button />
        </div>
        <!-- end right header -->
    </div>
    <!-- end header -->
</template>

<script>
import HeaderButton from './parts/HeaderButton'
import Notifications from './parts/Notifications'
import StoreButton from './parts/StoreButton'
import InformationButton from './parts/InformationButton'
import DropdownButton from './DropDown/DropdownButton'
import {mapActions, mapState} from 'vuex'

export default {
  name: "Header",
  components: {DropdownButton, InformationButton, StoreButton, Notifications, HeaderButton},
  computed:{
    ...mapState(['activeScreen','screens'])
  },
  methods:{
    ...mapActions({activate: 'activateScreen'}),
    showStore () {
      this.$modal.show('moduleStore');
    }
  }
}
</script>

<style scoped>

</style>
