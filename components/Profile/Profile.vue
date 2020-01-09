<template>
    <div
        class="inline-block align top"
    >
        <h3 class="text-3xl">
            Profile
        </h3>
        <p> <span class="font-bold">Name:</span> {{ $store.state.account.username }} </p>
        <p> <span class="font-bold">Email: </span>{{ $store.state.account.email }} </p>
        <br>
        <FunctionButton
            text="Log Out"
            @func="logout"
        />
        <br>
        <br>
    </div>
</template>

<script>
import FunctionButton from "../parts/FunctionButton"
export default {
  name: "Profile",
  components: {FunctionButton},
  methods:{
    logout(){
      this.$store.commit('account/logOut')
    }
  }
}
</script>

<style scoped>

</style>
