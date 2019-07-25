<template>
    <SettingsItem>
        <slot :value="value" />
        <input
            :value="value"
            :placeholder="defaultValue"
            @input="SetSetting"
        >
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'
import {mapMutations} from 'vuex'

export default {
  name: "String",
  components:{
    SettingsItem
  },
  props:{
    component:{
      type: String,
      required: true
    },
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
  data(){
    return {
      val: ''
    }
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    SetSetting(e){
      this.setComponentSetting({
        component: this.component,
        name: this.name,
        value: e.target.value
      })
    },
    defaultOnEmpty(e){
      if (!e.target.value){
        this.setComponentSetting({
          component: this.component,
          name: this.name,
          value: this.defaultValue
        })
      }
    }
  }
}
</script>

<style scoped>

</style>