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
                <h2>You updated successfully to v0.0.18</h2>
                <h2>An assistant for streaming which includes also some modules for specific games.</h2>
                <draggable
                    v-model="myList"
                    class="flex flex-wrap"
                    ghost-class="ghostClass"
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
                        :component-id="component.id"
                        :component="component.fullname"
                        :module="component.module"
                    >
                        non default text
                    </component>
                </draggable>
                <div
                    v-if="drag"
                    class="rounded-full border border-red-500 w-12 h-12 mx-auto absolute left-0 right-0 bottom-0 mb-6 overflow-hidden"
                >
                    <svg
                        class="h-full w-full fill-current text-red-400 absolute"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                    >
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                    <draggable
                        v-model="thrashList"
                        :group="{name:'componentList', pull: false, put: true}"
                        tag="div"
                        class="bg-red-300 opacity-50 h-full w-full absolute top-0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import FunctionButton from "~/components/parts/FunctionButton";

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
    },
    thrashList: {
      get(){ return []},
      set(value){}
    }
  },
  methods:{
    openComponentPicker: function(){
      this.$modal.show('componentPicker')
    },
    start: function(evt){
      this.drag = true
      evt.item.firstChild?.classList?.add('opacity-0')
    },
    stop: function(evt){
      this.drag = false
      evt.item.firstChild?.classList?.remove('opacity-0')
    }
  }
}

</script>
<style scoped>
.ghostClass{
    @apply bg-gray-300;
    @apply rounded-xxl;
    @apply border-4;
    @apply border-dashed;
    @apply border-gray-500;
}
</style>

