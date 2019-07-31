<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template #default="{component}">
            <label>
                <ToggleButton
                    :is-toggled-on="storeValue"
                    :show-text="false"
                    :disabled="disabled"
                    @update:isToggledOn="setSetting"
                />
                <slot :value="storeValue" />
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
  name: "Boolean",
  components:{
    SettingsItem
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
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
    disabled:{
      type: Boolean,
      default: false
    }
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
        value: Boolean(e)
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