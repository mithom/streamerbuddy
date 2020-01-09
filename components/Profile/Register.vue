<template>
    <div
        class="flex-1 align-top"
    >
        <h1 class="text-5xl">
            Register
        </h1>
        <p
            v-if="error !== null"
            class="text-red-700"
        >
            {{ error }}
        </p>
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
            <label for="email">email</label>
            <input
                id="email"
                v-model="email"
                class="form-input"
                name="email"
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
            <label for="confirm_password">confirm password</label>
            <input
                id="confirm_password"
                v-model="confirm_password"
                class="form-input"
                name="confirm_password"
                required
                type="password"
            >
            <br>
            <FunctionButton
                text="Register"
                @func="register"
            />
        </form>
    </div>
</template>

<script>
import FunctionButton from "../parts/FunctionButton"
export default {
  name: "Register",
  components: {FunctionButton},
  data(){
    return {
      username: null,
      password: null,
      confirm_password: null,
      email: null,
      error: null
    }
  },
  methods:{
    register(){
      this.error = null
      if(this.password !== this.confirm_password){
        this.error = 'Confirm password is not the same as password'
        this.password = null
        this.confirm_password = null
      }else{
        this.$store.dispatch('account/register', {
          username: this.username,
          password: this.password,
          email: this.email
        })
      }
    }
  }
}
</script>

<style scoped>

</style>