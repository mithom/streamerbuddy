<template>
    <Modal
        name="Profile"
        width="75%"
        height="75%"
    >
        <div class="overflow-auto h-full p-4 bg-gray-200">
            <CloseButton
                class="z-10"
                @click.native="$modal.hide('Profile')"
            />
            <Profile v-if="loggedInResult" />
            <LogInOrRegister v-else />
        </div>
    </Modal>
</template>

<script>
import CloseButton from "../parts/CloseButton";
import Profile from "./Profile";
import LogInOrRegister from "./LogInOrRegister";
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileModal',
  components: {LogInOrRegister, Profile, CloseButton},
  data(){
    return {
      loggedInResult: null
    }
  },
  computed:{
    ...mapGetters({loggedIn: 'account/loggedIn'})
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler(promise){
        // save Promise result in local state
        promise.then(result => this.loggedInResult = result)
      }
    }
  }
}
</script>

<style scoped>

</style>