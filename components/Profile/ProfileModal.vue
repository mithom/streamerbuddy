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
import loggedInMixin from '~/mixins/loggedInMixin'

export default {
  name: 'ProfileModal',
  components: {LogInOrRegister, Profile, CloseButton},
  mixins: [loggedInMixin]
}
</script>

<style scoped>

</style>
