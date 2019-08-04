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
                    type="number"
                    step="1"
                    @input="filterAndSet($event.target.value)"
                    @blur="defaultOnEmpty"
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
  name: "Integer",
  components:{
    SettingsItem
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
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
      componentName: componentName(this)
    }
  },
  computed:{
    storeValue: function(){
      const moduleSettings = this.$store.state.settings.componentSettings[this.componentName]
      return moduleSettings ? moduleSettings[this.name] : this.defaultValue
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
      setComponentSetting: 'settings/setComponentSetting'
    }),
    filterInput(e){
      e = e.match(/^-?\d*/, '');
    },
    filterAndSet(e){
      this.filterInput(e)
      this.setComponentSetting({
        component: this.componentName,
        name: this.name,
        value: Math.round(Number(e))
      })
    },
    defaultOnEmpty(e){
      if (!e.target.value){
        this.setComponentSetting({
          component: this.componentName,
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
