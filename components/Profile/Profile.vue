<template>
    <Modal
        name="Profile"
        width="75%"
        height="75%"
    >
        <div class="overflow-auto h-full p-4">
            <CloseButton
                class="z-10"
                @click.native="$modal.hide('Profile')"
            />
            <form
                action="#"
                @submit.prevent="login"
            >
                <label for="username">username</label>
                <input
                    id="username"
                    v-model="username"
                    name="username"
                    required
                >

                <br>

                <label for="password">password</label>
                <input
                    id="password"
                    v-model="password"
                    name="password"
                    required
                    type="password"
                >
                <input
                    type="submit"
                    value="Register"
                >
            </form>
            <!-- class="w-full p-2 border-b flex items-center relative" -->
        </div>
    </Modal>
</template>

<script>
import CloseButton from "../parts/CloseButton";

export default {
  name: 'Profile',
  components: {CloseButton},
  data(){
    return {
      username: null,
      password: null
    }
  },
  methods:{
    login(e){
      this.$store.dispatch('account/logIn', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>
