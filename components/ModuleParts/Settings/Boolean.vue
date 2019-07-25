<template>
    <SettingsItem>
        <ToggleButton
            :is-toggled-on="value"
            :show-text="false"
            @update:isToggledOn="SetSetting"
        />
        <slot :value="value" />
        <template #tooltip>
            <slot name="tooltip" />
        </template>
    </SettingsItem>
</template>

<script>
import SettingsItem from './SettingsItem'
import {mapMutations} from 'vuex'

export default {
  name: "Boolean",
  components:{
    SettingsItem
  },
  props:{
    component:{
      type: String,
      required: true
    },
    value:{
      type: Boolean,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    defaultValue:{
      type: Boolean,
      required: true
    },
  },
  data(){
    return {
      val: true
    }
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    SetSetting(e){
      console.log(e)
      this.setComponentSetting({
        component: this.component,
        name: this.name,
        value: Boolean(e)
      })
    },
  }
}
</script>

<style scoped>

</style>