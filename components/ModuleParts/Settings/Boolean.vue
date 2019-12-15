<template>
    <SettingsItem
        v-bind="$attrs"
        :name="name"
        :default-value="defaultValue"
    >
        <template #default>
            <label>
                <ToggleButton
                    v-if="type === toggleButton"
                    :is-toggled-on="storeValue"
                    :show-text="false"
                    :disabled="disabled"
                    @update:isToggledOn="setSetting"
                />
                <input
                    v-else-if="type === checkBox"
                    :checked="storeValue"
                    class="form-checkbox"
                    type="checkbox"
                    :disabled="disabled"
                    @change="setSetting($event.target.checked)"
                >
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
import {moduleName} from "~/app/component-util";

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
    },
    type:{
      type: String,
      default: 'checkBox',
      validator: function(val) {
        return ['toggleButton', 'checkBox'].includes(val)
      }
    }
  },
  data(){
    return {
      moduleName: moduleName(this),
      checkBox: 'checkBox',
      toggleButton: 'toggleButton',
    }
  },
  computed:{
    storeValue: function(){
      const moduleSettings = this.$store.state.settings.moduleSettings[this.moduleName]
      return moduleSettings ? moduleSettings[this.name] : this.defaultValue //don't use shorthand notation, as it are booleans
    },
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
      setModuleSetting: 'settings/setModuleSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue){
        this.setModuleSetting({
          moduleName: this.moduleName,
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
