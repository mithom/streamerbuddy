<template>
    <div class="container">
        <div>
            <FunctionButton
                v-if="managing"
                text="Add Component"
                @func="openComponentPicker"
            />
            <FunctionButton
                v-if="managing"
                text="Stop Admin"
                @func="$store.commit('dashboard/stopAdmin')"
            />
            <div id="dashboard">
                <h1>streamer-buddy</h1>
                <h2>You updated successfully to v0.0.8</h2>
                <h2>An assistant for streaming which includes also some modules for specific games.</h2>
                <draggable
                    v-model="myList"
                    class="flex flex-wrap"
                    ghost-class="ghostclass"
                    :disabled="!managing"
                    :animation="150"
                    :group="{name:'componentList', pull: true, put: true}"
                    @start="start"
                    @end="stop"
                >
                    <component
                        :is="component.fullname"
                        v-for="component in myList"
                        :key="component.id"
                    >
                        non default text
                    </component>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import FunctionButton from "~/components/parts/FunctionButton";
import {mapState} from "vuex";

export default {
  name: 'Dashboard',
  components: {FunctionButton, draggable},
  data(){
    return {
      drag: false,
      dragComponent: null,
    }
  },
  computed: {
    managing() {
      return this.$store.state.dashboard.managing
    },
    myList: {
      get() {
        return this.$store.state.dashboard.componentGrid
      },
      set(value) {
        this.$store.commit('dashboard/updateList', value)
      }
    }
  },
  methods:{
    openComponentPicker: function(){
      this.$modal.show('componentPicker')
    },
    start: function(evt){
      this.drag = true
      evt.item.firstChild.classList.add('opacity-0')
    },
    stop: function(evt){
      this.drag = false
      evt.item.firstChild.classList.remove('opacity-0')
    }
  }
}

</script>
<style scoped>
.ghostclass{
    @apply bg-gray-300;
    @apply rounded-xxl;
    @apply border-4;
    @apply border-dashed;
    @apply border-gray-500;
}
</style>

