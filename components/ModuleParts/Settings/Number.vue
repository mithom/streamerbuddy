<template>
    <SettingsItem>
        <slot />
        <input
            :value="value"
            :placeholder="defaultValue"
            type="number"
            step="0.01"
            @input="SetSetting"
            @blur="defaultOnEmpty"
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
  name: "Number",
  components:{
    SettingsItem
  },
  props:{
    component:{
      type: String,
      required: true
    },
    value:{
      type: Number,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: Number,
      required: true
    },
  },
  data(){
    return {
      val: 0
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
        value: Math.round(Number(e.target.value))
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