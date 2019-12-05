<template>
    <Modal
        v-show="!hidden"
        name="componentPicker"
        width="75%"
        height="75%"
    >
        <div class="overflow-auto h-full p-4">
            <CloseButton
                class="z-10"
                @click.native="hideSelf"
            />
            <draggable
                v-model="components"
                :group="{pull: 'clone', put: false, name:'componentList'}"
                :clone="clone"
                @start="startDrag"
                @end="stopDrag"
            >
                <component
                    :is="component.fullname"
                    v-for="component in components"
                    :key="'0' + component.fullname"
                    :component="component.fullname"
                    :module="component.module"
                >
                    non default text
                </component>
            </draggable>
        </div>
    </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import CloseButton from "~/components/parts/CloseButton";
import draggable from 'vuedraggable'

export default {
  name: "ComponentModal",
  components: {CloseButton, draggable},
  data(){
    return {
      hidden: false
    }
  },
  computed: {
    ...mapGetters(['allModules']),
    components() {
      const components = []
      for (const mod of this.allModules) {
        if (mod.components && mod.components.length !== 0) {
          components.push(...mod.components)
        }
      }
      return components
    },
  },
  methods:{
    hideSelf: function(){
      this.$modal.hide('componentPicker')
    },
    startDrag: function(){
      this.drag = true
      this.hidden = true
    },
    stopDrag: function(){
      this.drag = false
      this.hidden = false
      this.hideSelf()
    },
    clone: function(original){
      const cloned = {...original}
      cloned.id = this.$store.state.dashboard.nextComponentId
      this.$store.commit('dashboard/consumeComponentId')
      return cloned
    }
  }
}
</script>

<style scoped>

</style>
