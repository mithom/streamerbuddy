<template>
    <div>
        <Header
            :expanded="opened"
            @click.native="opened = !opened"
        >
            <slot />
        </Header>
        <transition 
            @enter="enter" 
            @leave="leave"
        >
            <ul
                v-show="opened"
                style="transition: max-height 0.2s ease-out"
            >
                <module-item
                    v-for="module of modules"
                    :key="module.fullname"
                    :active="activeModuleComponent === module.fullname"
                    :component="module.fullname"
                    :module="module.module"
                    @click.native="activate(module)"
                >
                    {{ module.name }}
                </module-item>
            </ul>
        </transition>
    </div>
</template>

<script>
import Header from './Header'
import ModuleItem from './ModuleItem'
import Velocity from 'velocity-animate'
import {mapActions} from 'vuex'

export default {
  name: 'Category',
  components:{
    ModuleItem,
    Header
  },
  props:{
    modules:{
      type: Array,
      default: ()=>[]
    }
  },
  data(){
    return {
      opened: true
    }
  },
  computed:{
    activeModuleComponent(){
      return this.$store.getters.activeModule?.fullname
    }
  },
  methods:{
    ...mapActions({activate: 'activateModule'}),
    // activate: function(module){
    //   this.$store.dispatch('activateModule', module)
    // },
    enter: function(el, done){
      Velocity(el, 'slideDown',
        {
          easing: "easeInBack",
          duration: 200,
          complete: done
        }
      )
    },
    leave: function(el, done){
      Velocity(el, 'slideUp',
        {
          easing: "easeInBack",
          duration: 200,
          complete: done
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
