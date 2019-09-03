<template>
    <div class="container">
        <div>
            <FunctionButton
                v-if="managing"
                :func="openComponentPicker"
                text="Add Component"
            />
            <div id="dashboard">
                <h1>streamer-buddy</h1>
                <h2>You updated successfully to v0.0.8</h2>
                <h2>An assistant for streaming which includes also some modules for specific games.</h2>
                <draggable
                    v-model="myList"
                    :animation="150"
                    :group="{name:'componentList', pull: true, put: true}"
                    @start="drag = true"
                    @end="drag = false"
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

export default {
  name: 'Dashboard',
  components: {FunctionButton, draggable},
  data(){
    return {
      drag: false,
      managing: true
    }
  },
  computed: {
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
  }
}

</script>

