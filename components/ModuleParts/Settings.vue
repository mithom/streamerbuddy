<template>
    <portal to="settings">
        <slot name="before" />
        <slot>
            <template v-for="[name, setting] of Object.entries(settings)">
                <Component
                    :is="componentType(setting.type)"
                    :key="name"
                    :name="name"
                    :value="settingsValue ? settingsValue[name] : setting.default"
                    :component="componentName"
                    :default-value="setting.default"
                >
                    <template #default="props">
                        {{ Object.keys(props).reduce((str, key)=> str.replace(new RegExp(`\{${key}\}`, 'g'), props[key]), setting.text) }}
                    </template>
                    <!-- eslint-disable -->
                    <template #tooltip>{{ setting.tooltip }}</template>
                    <!-- eslint enable -->
                </Component>
            </template>
        </slot>
        <slot name="after" />
    </portal>
</template>

<script>
import Integer from './Settings/Integer'
import Number from './Settings/Number'
import String from './Settings/String'
import Boolean from './Settings/Boolean'
import Button from './Settings/Button'
import ColorPicker from './Settings/ColorPicker'
import Range from './Settings/Range'
import SelectBox from './Settings/SelectBox'

import {mapGetters} from 'vuex'

export default {
  name: "Settings",
  components:{
    Integer,
    Number,
    String,
    Boolean,
    SButton: Button,
    ColorPicker,
    Range,
    SelectBox
  },
  model:{
    prop: 'settingsValue',
    event: 'change'
  },
  props:{
    settings:{
      type: Object,
      default: ()=>{},
      validator: value =>{
        return Object.values(value).every(setting => ['type','default','text','tooltip'].every(key=> key in setting))
      }
    }
  },
  data(){
    return {
      Integer: 'Integer',
      Number: 'Number',
      String: 'String',
      Boolean: 'Boolean',
      Button: 'SButton',
      ColorPicker: 'ColorPicker',
      Range: 'Range',
      SelectBox: 'SelectBox'
    }
  },
  computed:{
    settingsValue: function(){
      return this.$store.getters['settings/settings'](this.componentName)
    },
    componentName: function(){
      return this.getModuleInstance(this.$parent).$attrs.component
    },
  },
  watch:{
    settingsValue: function(val){
      this.$emit('change', val)
    }
  },
  mounted() {
    this.$store.dispatch('settings/addComponentSettings', {
      component: this.componentName,
      settings: this.settings,
    })
    this.$emit('change', this.settingsValue)
  },
  methods:{
    componentType: function (type) {
      return this[type]
    },
    getModuleInstance: function (VueInstance){
      //get the root of the module, no matter where the settings tag is defined
      if(VueInstance.$parent.$options._componentTag === 'Modules'){
        return VueInstance
      }else{
        return this.getModuleInstance(VueInstance.$parent)
      }
    },
  }
}
</script>

<style scoped>

</style>