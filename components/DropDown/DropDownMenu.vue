<template>
    <div
        class="absolute right-0 w-64 mt-1 py-1 bg-blue-700 text-blue-1000 shadow-lg rounded-lg z-10"
    >
        <ul class="bg-white py-1">
            <menu-item><i class="far fa-address-card" /> Profile</menu-item>
            <menu-item
                @click.native="showDashboardAdmin"
            >
                <i class="fas fa-map" /> Dashboard Admin
            </menu-item>
            <menu-item
                @click.native="showConnectionManager"
            >
                <i class="fas fa-plug" /> Connections
            </menu-item>
            <menu-item><i class="fas fa-wrench" /> Account settings</menu-item>
            <menu-item><i class="far fa-address-card" /> Profile</menu-item>
            <menu-item>
                <i class="fas fa-globe" /> Language
                <span
                    class="float-right text-sm font-bold uppercase text-blue-500"
                >English
                    <svg
                        class="fill-current text-blue-500 w-4 h-4 float-right mt-1"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
                        />
                    </svg>
                </span>
            </menu-item>
            <menu-item>
                <i class="fas fa-moon" /> Dark Theme
                <ToggleButton
                    :show-text="false"
                    :is-toggled-on.sync="darkMode"
                    class="inline-block float-right"
                />
            </menu-item>

            <li>
                <hr class="mx-4 my-1 border-gray-400 border-b">
            </li>

            <menu-item> <i class="fas fa-sign-out-alt" /> Logout </menu-item>
        </ul>
    </div>
</template>

<script>
import MenuItem from './MenuItem'
import {mapActions} from "vuex";

export default {
  name: 'DropDownMenu',
  components: {MenuItem},
  data(){
    return {
      darkMode: true
    }
  },
  methods:{
    ...mapActions({activate: 'activateScreen'}),
    showConnectionManager: function(){
      this.$emit('close')
      this.$modal.show('connectionManager')
    },
    showDashboardAdmin: function(){
      this.$emit('close')
      this.activate('DashboardAdmin')
    }
  }
}
</script>

<style scoped>

</style>
