<template>
    <div
        class="absolute right-0 w-64 mt-1 py-1 bg-blue-700 text-blue-1000 shadow-lg rounded-lg z-10"
    >
        <ul class="bg-white py-1">
            <menu-item
                @click.native="showProfile"
            >
                <Zondicon
                    icon="User"
                    class="h-4 inline"
                /> Profile
            </menu-item>
            <menu-item
                @click.native="showDashboardAdmin"
            >
                <Zondicon
                    icon="map"
                    class="h-4 inline"
                /> Dashboard Admin
            </menu-item>
            <menu-item
                @click.native="showConnectionManager"
            >
                <Zondicon
                    icon="link"
                    class="h-4 inline"
                /> Connections
            </menu-item>
            <menu-item
                :disabled="true"
            >
                <Zondicon
                    icon="wrench"
                    class="h-4 inline"
                /> Account Settings
            </menu-item>
            <menu-item
                v-for="locale in this.$i18n.locales"
                :key="locale.code"
                :url="switchLocalePath(locale.code)"
            >
                <Zondicon
                    icon="globe"
                    class="h-4 inline"
                /> Language
                <span
                    class="float-right text-sm font-bold uppercase text-blue-500"
                >
                    {{ locale.name }}
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
            <menu-item
                :disabled="true"
            >
                <Zondicon
                    icon="adjust"
                    class="h-4 inline"
                /> Dark Theme
                <ToggleButton
                    :show-text="false"
                    :is-toggled-on.sync="darkMode"
                    class="inline-block float-right"
                />
            </menu-item>

            <li>
                <hr class="mx-4 my-1 border-gray-400 border-b">
            </li>

            <menu-item
                @click.native="logout"
            >
                <Zondicon
                    icon="share"
                    class="w-5 inline"
                    style="transform: rotate(90deg)"
                /> Logout
            </menu-item>
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
    showConnectionManager(){
      this.$emit('close')
      this.$modal.show('connectionManager')
    },
    showDashboardAdmin(){
      this.$emit('close')
      this.activate('DashboardAdmin')
    },
    showProfile(){
      this.$emit('close')
      this.$modal.show('Profile')
    },
    logout(){
      this.$store.commit('account/logOut')
    }
  }
}
</script>

<style scoped>

</style>
