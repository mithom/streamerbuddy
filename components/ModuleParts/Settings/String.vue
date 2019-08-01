<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template>
            <label>
                <slot :value="storeValue" />
                <input
                    :value="storeValue"
                    :placeholder="defaultValue"
                    @input="setSetting($event.target.value)"
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
      const moduleSettings = this.$store.state.settings.componentSettings[this.componentName]
      return moduleSettings ? moduleSettings[this.name] : this.defaultValue
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
  methods:{
    ...mapMutations({
      setComponentSetting: 'settings/setComponentSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue) {
        this.setComponentSetting({
          component: this.componentName,
          name: this.name,
          value: e
        })
      }
    },
  }
}
</script>

<style scoped>

</style>