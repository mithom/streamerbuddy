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
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-4 hover:bg-blue-800"
                        >Dashboard</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-4 bg-blue-800">Modules</a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-4 hover:bg-blue-800"
                        >Commands</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-4 hover:bg-blue-800">Timers</a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-4 hover:bg-blue-800">Extras</a>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- end left header -->
        <!-- right header -->
        <div class="flex justify-end items-center text-white">
            <div class="flex mr-2 cursor-pointer">
                <div class="relative p-3 mr-1">
                    <svg
                        class="fill-current text-white w-5 h-5 hover-opacity"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"
                        />
                    </svg>
                    <div
                        class="absolute top-0 right-0 -mr-2 rounded-lg w-6 h-6 text-center leading-snug border-2 border-blue-700 bg-blue-1000 text-sm text-white"
                    >
                        4
                    </div>
                </div>
                <div class="relative p-3 mr-1">
                    <svg
                        class="fill-current text-white w-5 h-5 hover-opacity"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"
                        />
                    </svg>
                </div>
                <div class="relative p-3 mr-1">
                    <svg
                        class="fill-current text-white w-5 h-5 hover-opacity"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"
                        />
                    </svg>
                    <div
                        class="absolute top-0 right-0 -mr-2 rounded-lg w-6 h-6 text-center leading-snug border-2 border-blue-700 bg-blue-1000 text-sm text-white"
                    >
                        1
                    </div>
                </div>
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
export default {
  name: "Header"
}
</script>

<style scoped>

</style>