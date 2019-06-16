<template>
    <!-- start header -->
    <div
        class="flex bg-blue-700 px-8 justify-between items-center flex-shrink-0"
    >
        <!-- left header -->
        <div class="flex text-white items-center">
            <div
                class="logo text-2xl mr-8 w-10 h-10 bg-white text-blue-1000 rounded-full text-center"
            >
                SB
            </div>
            <nav>
                <ul class="flex text-sm uppercase font-semibold">
                    <HeaderButton>Dashboard</HeaderButton>
                    <HeaderButton>Modules</HeaderButton>
                    <HeaderButton>Commands</HeaderButton>
                    <HeaderButton>Timers</HeaderButton>
                    <HeaderButton>Extras</HeaderButton>
                </ul>
            </nav>
        </div>
        <!-- end left header -->
        <!-- right header -->
        <div class="flex justify-end items-center text-white">
            <div class="flex mr-2 cursor-pointer">
                <Notifications/>
                <StoreButton/>
                <InformationButton/>
            </div>
            <div class="relative">
                <button
                    class="relative flex items-center focus:outline-none px-4 py-3 hover:bg-blue-800"
                >
                    <img
                        class="rounded-full h-6 w-6 mr-2"
                        style="box-shadow: inset 0 0 0 1px hsla(0, 0%,0%, .1)"
                        src="https://randomuser.me/api/portraits/women/10.jpg"
                    >
                    <span class="text-right px-1">WellBrained</span>
                    <svg
                        class="fill-current text-white w-6 h-6"
                        viewBox="0 0 20 20">
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                </button>
                <!-- Dropdown menu for profile -->
                <div
                    class="absolute right-0 w-64 mt-1 py-1 bg-blue-700 text-blue-1000 shadow-lg rounded-lg"
                >
                    <ul class="bg-white py-1">
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="far fa-address-card"/> Profile</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-map"/> Dashboard Admin</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-plug"/> Connections</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-wrench"/> Account settings</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-globe"/> Language
                                <span
                                    class="float-right text-sm font-bold uppercase text-blue-500"
                                >English
                                    <svg
                                        class="fill-current text-blue-500 w-4 h-4 float-right mt-1"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
                                        />
                                    </svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-moon"/> Dark Theme
                                <span
                                    class="border rounded-full border-blue-500 inline-block items-center float-right cursor-pointer w-12 bg-blue-600 justify-end"
                                >
                                    <span
                                        class="rounded-full border w-6 h-6 border-blue-500 shadow-inner bg-white shadow block float-right"
                                    />
                                </span>
                            </a>
                        </li>
                        <li>
                            <hr class="mx-4 my-1 border-gray-400 border-b">
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 hover:bg-gray-200"
                            ><i class="fas fa-sign-out-alt"/> Logout</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- end right header -->
    </div>
    <!-- end header -->
</template>

<script>
import HeaderButton from './parts/HeaderButton'
import Notifications from './parts/Notifications'
import StoreButton from './parts/StoreButton'
import IconButton from './parts/IconButton'
import InformationButton from './parts/InformationButton'
export default {
  name: "Header",
  components: {InformationButton, IconButton, StoreButton, Notifications, HeaderButton}
}
</script>

<style scoped>

</style>
