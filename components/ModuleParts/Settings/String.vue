<template>
    <SettingsItem
        :name="name"
        :default-value="defaultValue"
    >
        <template #default="{component}">
            <label>
                <slot :value="storeValue" />
                <input
                    :value="storeValue"
                    :placeholder="defaultValue"
                    @input="setSetting"
                >
            </label>
        </template>
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'
import {mapMutations} from 'vuex'
import {componentName} from "~/app/component-util";

export default {
  name: "String",
  components:{
    SettingsItem
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
    value:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: String,
      required: true
    },
  },
  computed:{
    storeValue: function(){
      return this.$store.state.settings.componentSettings[this.componentName][this.name]
    },
    componentName: function(){
      return componentName(this)
    }
  },
  watch:{
    value(val){
      if(val !== this.storeValue){
        this.setSetting(val)
      }
    },
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    setSetting(e){
      this.setComponentSetting({
        component: this.componentName,
        name: this.name,
        value: e.target ? e.target.value : e
      })
      if(this.value !== this.storeValue){
        this.$emit('input', this.storeValue)
      }
    },
  }
}
</script>

<style scoped>

</style>