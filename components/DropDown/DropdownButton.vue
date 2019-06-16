<template>
    <div class="relative">
        <button
            class="relative flex items-center focus:outline-none px-4 py-3 hover:bg-blue-800"
            @click="MenuOpen = !MenuOpen"
        >
            <img
                class="rounded-full h-6 w-6 mr-2"
                style="box-shadow: inset 0 0 0 1px hsla(0, 0%,0%, .1)"
                src="https://randomuser.me/api/portraits/women/10.jpg"
            >
            <span class="text-right px-1">{{ Name }}</span>
            <svg
                class="fill-current text-white w-6 h-6"
                viewBox="0 0 20 20">
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
            </svg>
        </button>
        <!-- Dropdown menu for profile -->
        <DropDownMenu v-if="MenuOpen"/>
    </div>
</template>

<script>
import DropDownMenu from './DropDownMenu'
export default {
  name: 'DropdownButton',
  components: {DropDownMenu},
  data(){
    return {
      MenuOpen: false,
      Name: 'WellBrained'
    }
  }
}
</script>

<style scoped>

</style>
