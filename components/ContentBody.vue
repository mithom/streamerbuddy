<template>
    <div class="w-4/5 p-4 text-blue-1000 -mx-2">
        <!-- Content: Header -->
        <Header />
        <dashboard />
        <!-- Content: Sub Header -->
        <div class="flex -mx-2 my-4">
            <div class="w-full px-2">
                <p class="text-xl">
                    Possible Layouts:
                </p>
            </div>
        </div>
        <!-- Content: 1/2 | 1/2  Layout -->
        <div class="flex -mx-2 my-4">
            <card :width-enum="widthType.HALF" />
            <card :width-enum="widthType.HALF" />
        </div>
        <!-- Content: 1/3 | 1/3 | 1/3 Layout -->
        <div class="flex -mx-2 my-4">
            <card />
            <card :width-enum="widthType.THIRD" />
            <card :width-enum="widthType.THIRD">
                custom content
            </card>
        </div>
        <!-- Content: 2/3 | 1/3 Layout -->
        <div class="flex -mx-2 my-4">
            <card :width-enum="widthType.TWO_THIRD" />
            <card :width-enum="widthType.THIRD" />
        </div>
    </div>
</template>

<script>
import Dashboard from "./content/Dashboard"
import Card from "./content/Card"
import Header from './content/Header'
import {widthType} from '~/app/enums'

export default {
  name: "ContentBody",
  components: {
    Dashboard,
    Card,
    Header
  },
  data(){
    return {
      widthType: widthType
    }
  },
}
</script>

<style scoped>

</style>
