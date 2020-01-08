<template>
    <div
        class="inline-block align top"
    >
        <h3>Profile</h3>
        <p> {{ $store.state.account.username }} </p>
        <p> {{ $store.state.account.email }} </p>
        <br>
        <br>
        <form
            action="#"
            @submit.prevent="logout"
        >
            <input
                class="form-input"
                type="submit"
                value="Log Out"
            >
        </form>
    </div>
</template>

<script>
export default {
  name: "Profile",
  methods:{
    logout(){
      this.$store.commit('account/logOut')
    }
  }
}
</script>

<style scoped>

</style>