import Vue from 'vue'
import Card from '~/components/parts/Card'
import ToggleButton from '~/components/parts/ToggleButton'
import Settings from '~/components/moduleParts/Settings/Settings'
import Integer from "~/components/ModuleParts/Settings/Integer";
import Boolean from "~/components/ModuleParts/Settings/Boolean";
import String from "~/components/ModuleParts/Settings/String";
import Number from "~/components/ModuleParts/Settings/Number";
import Range from "~/components/ModuleParts/Settings/Range";
import SelectBox from "~/components/ModuleParts/Settings/SelectBox";
import Button from "~/components/ModuleParts/Settings/Button";
import ColorPicker from "~/components/ModuleParts/Settings/ColorPicker";
import Hook from '~/components/ModuleParts/Hooks/Hook'
import Provider from '~/components/ModuleParts/Hooks/Provider'
import Sink from '~/components/ModuleParts/Hooks/Sink'
import Receiver from '~/components/ModuleParts/Hooks/Receiver'

// register all components here that will be available to the dynamic modules
//Parts
Vue.component('Card', Card)
Vue.component('ToggleButton', ToggleButton)

//Settings
Vue.component('Settings', Settings)
Vue.component('Boolean', Boolean)
Vue.component('Integer', Integer)
Vue.component('String', String)
Vue.component('Number', Number)
Vue.component('Range', Range)
Vue.component('SelectBox', SelectBox)
Vue.component('SButton', Button)
Vue.component('ColorPicker', ColorPicker)

//Hooks
Vue.component('Hook', Hook)
Vue.component('Provider', Provider)
Vue.component('Sink', Sink)
Vue.component('Receiver', Receiver)
