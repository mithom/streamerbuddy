<template>
    <div>
        <div 
            :class="{'min-h-screen-mac': isMac, 'min-h-screen-windows': !isMac}"
            class="flex flex-col bg-gray-200 font-sans antialiased">

            <!-- the full header component -->
            <Header>test</Header>

            <!-- content area (sidebar + content) -->
            <div class="flex flex-grow">
                <div class="flex pt-4 w-75 bg-blue-1000 sidebar">
                    <div class="flex flex-col text-gray-300 h-full w-full">
                        <p class="font-bold text-sm uppercase text-blue-400 m-2 mt-6 ml-4">
                            <svg
                                class="fill-current inline w-4 h-4"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                            Modules - Categorie #1
                        </p>
                        <ul class="">
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                StreamTimers
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                Alerts
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                Notifications
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                LiveTweeter
                            </li>
                        </ul>

                        <p class="font-bold text-sm uppercase text-blue-400 m-2 mt-6 ml-4">
                            <svg
                                class="fill-current inline w-4 h-4"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                            Modules - Categorie #2
                        </p>
                        <ul class="">
                            <li
                                class="py-2 pl-8 pr-4 text-white bg-blue-800 border-l-4 border-blue-300"
                            >
                                ApexStats (active)
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                MK11Stats
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                LoLStats
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                SekiroStats
                            </li>
                        </ul>

                        <p class="font-bold text-sm uppercase text-blue-400 m-2 mt-6 ml-4">
                            <svg
                                class="fill-current inline w-4 h-4"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                            StarCraft 2 - Categorie #3
                        </p>
                        <ul class="">
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                SC2 Match Info
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                SC2 Scene Switcher
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                SC2 Betting System
                            </li>
                            <li
                                class="py-2 pl-8 pr-4 hover:bg-blue-900 border-l-4 border-transparent"
                            >
                                SC2 Replay Renamer
                            </li>
                        </ul>
                    </div>
                </div>
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
                    <nuxt/>
                    <!-- Content: Sub Header -->
                    <div class="flex -mx-2 my-4">
                        <div class="w-full px-2">
                            <p class="text-xl">Possible Layouts:</p>
                        </div>
                    </div>
                    <!-- Content: 1/2 | 1/2  Layout -->
                    <div class="flex -mx-2 my-4">
                        <div class="w-1/2 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/2 column</div>
                        </div>
                        <div class="w-1/2 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/2 column</div>
                        </div>
                    </div>
                    <!-- Content: 1/3 | 1/3 | 1/3 Layout -->
                    <div class="flex -mx-2 my-4">
                        <div class="w-1/3 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/3 column</div>
                        </div>
                        <div class="w-1/3 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/3 column</div>
                        </div>
                        <div class="w-1/3 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/3 column</div>
                        </div>
                    </div>
                    <!-- Content: 2/3 | 1/3 Layout -->
                    <div class="flex -mx-2 my-4">
                        <div class="w-2/3 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">2/3 column</div>
                        </div>
                        <div class="w-1/3 px-2">
                            <div class="bg-white shadow rounded h-32 p-4">1/3 column</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end sidebar -->
    </div>
</template>

<script>
import Header from '~/components/header'
import {platform} from 'process'

export default {
  components:{
    Header
  },
  data(){
    return {
      platform: platform
    }
  },
  computed: {
    isMac(){
      return platform === 'darwin'
    }
  }
}
</script>
