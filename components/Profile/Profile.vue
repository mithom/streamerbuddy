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
            <div
                class="inline-block align top"
            >
                <h3>Profile</h3>
                <p> {{ $store.state.account.username }} </p>
                <p> {{ $store.state.account.email }} </p>
            </div>
            <div
                class="inline-block align-top"
            >
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
                    <br>
                    <input
                        type="submit"
                        value="Log In"
                    >
                </form>
                <br>
                <br>
                <br>
                <form
                    action="#"
                    @submit.prevent="logout"
                >
                    <input
                        type="submit"
                        value="Log Out"
                    >
                </form>
            </div>
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
    login(){
      this.$store.dispatch('account/logIn', {
        username: this.username,
        password: this.password
      })
    },
    logout(){
      this.$store.commit('account/logOut')
    }
  }
}
</script>

<style scoped>

</style>
