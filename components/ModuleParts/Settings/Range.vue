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
                    type="range"
                    min
                    max
                    :step="step"
                    class="w-full"
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
import {moduleName} from "~/app/component-util";

export default {
  name: "Range",
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
    min:{
      type: Number,
      default: 0
    },
    max:{
      type: Number,
      default: 100
    },
    step:{
      type: Number,
      default: 5
    },
  },
  data(){
    return {
      moduleName: moduleName(this)
    }
  },
  computed:{
    storeValue: function(){
      const moduleSettings = this.$store.state.settings.moduleSettings[this.moduleName]
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
      setModuleSetting: 'settings/setModuleSetting'
    }),
    setSetting(e){
      if(e !== this.storeValue){
        this.setModuleSetting({
          moduleName: this.moduleName,
          name: this.name,
          value: Number(e)
        })
      }
    },
  }
}
</script>

<style scoped>
input{
    -webkit-appearance: none;
    width: 100%;
    height: 0.7em;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

input::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

input:hover {
    opacity: 1; /* Fully shown on mouse-over */
}
</style>
