<template>
    <div class="w-4/5 p-4 text-blue-1000 -mx-2">
        <!-- Content: Header -->
        <div class="flex -mx-2 mb-4">
            <div
                class="flex w-full mx-2 items-center pb-2 border-b-2 border-gray-400"
            >
                <h1 class="text-2xl font-semibold">StreamTimers</h1>
                <svg
                    class="fill-current w-5 h-5 ml-8 mr-4 cursor-pointer"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                </svg>
                <span
                    class="border rounded-full border-blue-500 inline-block items-center float-right cursor-pointer w-12 bg-blue-600 justify-end"
                >
                    <span
                        class="rounded-full border w-6 h-6 border-blue-500 shadow-inner bg-white shadow block float-right"
                    />
                </span>
                <button
                    class="leading-snug bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 shadow-md uppercase font-semibold rounded-lg ml-4"
                >
                    Publish
                </button>
            </div>
        </div>
        <dashboard/>
        <!-- Content: Sub Header -->
        <div class="flex -mx-2 my-4">
            <div class="w-full px-2">
                <p class="text-xl">Possible Layouts:</p>
            </div>
        </div>
        <!-- Content: 1/2 | 1/2  Layout -->
        <div class="flex -mx-2 my-4">
            <card :width-type="widthType.HALF"/>
            <card :width-type="widthType.HALF"/>
        </div>
        <!-- Content: 1/3 | 1/3 | 1/3 Layout -->
        <div class="flex -mx-2 my-4">
            <card />
            <card :width-type="widthType.THIRD"/>
            <card :width-type="widthType.THIRD">custom content</card>
        </div>
        <!-- Content: 2/3 | 1/3 Layout -->
        <div class="flex -mx-2 my-4">
            <card :width-type="widthType.TWO_THIRD"/>
            <card :width-type="widthType.THIRD"/>
        </div>
    </div>
</template>

<script>
import Dashboard from "./content/Dashboard"
import Card from "./content/Card"
import {widthType} from '~/app/enums'

export default {
  name: "ContentBody",
  components: {
    Dashboard,
    Card
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
