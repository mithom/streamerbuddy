<template>
    <div>
        <Header
            :expanded="opened"
            @click.native="opened = !opened" ><slot/></Header>
        <transition 
            @enter="enter" 
            @leave="leave">
            <ul
                v-if="opened"
                class="overflow-hidden"
                style="transition: max-height 0.2s ease-out"
            >
                <module-item
                    v-for="module of modules"
                    :active="activeModule === module"
                    :key="module"
                    @click.native="$emit('update:activeModule', module)"
                >
                    {{ module }}
                </module-item>
            </ul>
        </transition>
    </div>
</template>

<script>
import Header from './Header'
import ModuleItem from './ModuleItem'
import Velocity from 'Velocity-animate'

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
    },
    activeModule:{
      type: String,
      default: null
    }
  },
  data(){
    return {
      opened: true
    }
  },
  methods:{
    enter: function(el, done){
      Velocity(el, 'slideDown',
        {
          duration: 150,
          easing: "easeInBack"
        },
        {
          complete: done
        }
      )
    },
    leave: function(el, done){
      Velocity(el, 'slideUp',
        {
          duration: 150,
          easing: "easeInBack"
        },
        {
          complete: done
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
