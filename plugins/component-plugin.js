import Vue from 'vue'
import Card from '~/components/parts/Card'
import ToggleButton from '~/components/parts/ToggleButton'
import Settings from '~/components/moduleParts/Settings'

// register all components here that will be available to the dynamic modules
Vue.component('Card', Card)
Vue.component('ToggleButton', ToggleButton)
Vue.component('Settings', Settings)