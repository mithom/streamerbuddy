<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template>
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
      default: false
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
      const moduleSettings = this.$store.state.settings.componentSettings[this.componentName]
      return moduleSettings ? moduleSettings[this.name] : this.defaultValue //don't use shorthand notation, as it are booleans
    },
    componentName: function(){
      return componentName(this)
    }
  },
  watch:{
    value(val){
      this.setSetting(val)
    },
    storeValue(val){
      this.$emit('input', val)
    }
  },
  mounted(){
    this.$emit('input', this.storeValue)
  },
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue){
        this.setComponentSetting({
          component: this.componentName,
          name: this.name,
          value: Boolean(e)
        })
      }
    },
  }
}
</script>

<style scoped>

</style>