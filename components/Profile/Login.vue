<template>
    <div
        class="flex-1 align-top"
    >
        <h1 class="text-5xl">
            Log In
        </h1>
        <form>
            <label for="username">username</label>
            <input
                id="username"
                v-model="username"
                class="form-input"
                name="username"
                required
            >
            <br>
            <label for="password">password</label>
            <input
                id="password"
                v-model="password"
                class="form-input"
                name="password"
                required
                type="password"
            >
            <br>
            <br>
            <FunctionButton
                text="Log In"
                @func="login"
            />
        </form>
    </div>
</template>

<script>
import FunctionButton from "../parts/FunctionButton"

export default {
  name: "Login",
  components: {FunctionButton},
  data(){
    return {
      username: null,
      password: null,
    }
  },
  methods:{
    login(){
      this.$store.dispatch('account/logIn', {
        username: this.username,
        password: this.password
      })
    },
  }
}
</script>

<style scoped>

</style>