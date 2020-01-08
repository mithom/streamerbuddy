<template>
    <div class="flex">
        <div
            class="flex-1 align-top"
        >
            <h1 class="text-5xl">
                Log In
            </h1>
            <form
                action="#"
                @submit.prevent="login"
            >
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
                <input
                    class="form-input"
                    type="submit"
                    value="Log In"
                >
            </form>
        </div>
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
                {{ reg_error }}
            </p>
            <form
                action="#"
                @submit.prevent="register"
            >
                <label for="reg_username">username</label>
                <input
                    id="reg_username"
                    v-model="reg_username"
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
                <label for="reg_password">password</label>
                <input
                    id="reg_password"
                    v-model="reg_password"
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
                <input
                    class="form-input"
                    type="submit"
                    value="Register"
                >
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: "LogInOrRegister",
  data(){
    return {
      username: null,
      password: null,
      reg_username: null,
      reg_password: null,
      confirm_password: null,
      email: null,
      reg_error: null
    }
  },
  methods:{
    login(){
      this.$store.dispatch('account/logIn', {
        username: this.username,
        password: this.password
      })
    },
    register(){
      this.reg_error = null
      if(this.reg_password !== this.confirm_password){
        this.reg_error = 'Confirm password is not the same as password'
        this.reg_password = null
        this.confirm_password = null
      }else{
        this.$store.dispatch('account/create', {
          username: this.reg_username,
          password: this.reg_password,
          email: this.email
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
