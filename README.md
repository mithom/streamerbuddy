# StreamerBuddy

Just an usual Bot to help streamers through their day with some features and functions.

## how to develop modules
certain components are made available for integration of your module in the framework.

All settings components except the first can be displayed either in the separate settings panel (which can be opened through a settings button) or inside the module itself.
Multiple copies with the same name will sync. This allows you to have a setting both in module AND in the settings panel.
For all these components, logic can be customised and even looks can be changed using slots.

The communication components don't have any visual effect except for data manipulation.

a module will always be loaded, even when not visible, except when disabled and not selected.

* General purpose components:
    * Card
    * ToggleButton
* Setting components
    * Settings
    * Boolean
    * Button
    * ColorPicker
    * Integer
    * Number
    * Range
    * SelectBox
    * String
* Inter module communication
    * for CORE modules only:
        * Receiver
        * Provider
    * for all modules:
        * Hook
        * Sink

## Folder Structure and what does what
### app
Inn the app folder, you find all code that is run on the main thread. This code is not compiled using webpack and is thus limited to ES2015 instead of ES7
if code is shared between the main process and the renderer process, it will also be located in this folder
if there is other code in there (like component-util.js) it should probably be refactored.

**component-util.js** contains functions that are shared by almost all of the components made for the modules to be used.
They should probably be converted into mixins for these components. it should than be placed in the mixins folder as this is only used in components

**constants.js** explains itself, this gets loaded into the store and the main render process. maybe somewhere else, i might've forgotten

**enums.js** i only just now see this should be merged with constants, especially since i removed the enum class XD

**module-installer.js** contains the code that downloads modules from github and copies them into the filesystem

**module-loader.js** reads the filesystem to detect installed modules

**module-loader-plugin.js** vuex store plugin to add the loaded modules from module-loader to the store, should be moved to plugins/vuex/ maybe. 

**myOctoKit.js** shared code between module store and module-installer for github access

**native-require.js** exposes the native require function that webpack doesn't parse, needed for the dynamic module loading

**OAuth.js** glue for the OAuth authentication flow, currently implicit grant only implemented

**updater.js** auto-updater code

### assests
**tailwind.css** here you can configure tailwind and make new tailwind classes using @apply etc.
This is also the place where i designed the custom scrollbars.

### components
**ConnectionsManager/** is a modal that allows you to manage your connections

**content/** the content shown when one of the main tabs is clicked, each tab is a folder with corresponding name as main component.
just explore the components here and try to figure out what i did, too much to tell everything, probably bad code, i learned a lot in the mean time, didnt redo everything though.

**DropDown/** the dropdown button and menu on the top right

**ModuleParts** all components that are exposed to the modules and meant to be used by them.

*ModuleParts/Connections/* ConnectionSource is what a module defines to add a connect button to the connection manager and configure an OAuth process.
A variable will be synced using v-model to pass back the generated connections.

*ModuleParts/Hooks/* is meant for inter module communication, for example the twitch module can define a **provider** component through which he sends the chat messages.
All other modules can than define a **Hook** component with the same name to have a callback on this.
 **Sink** and **Receiver** work the other way around, where twitch can define a Receiver and all other modules can dump data into a Sink. This will for example allow the twitch module to send messages delegated from the other modules.
 
*ModuleParts/Settings/* are components that make persistent settings that can either be shown in place or in the settingsbar.
 When at least one setting is shown in the settingsbar, the settingsbutton will be shown on that module.
 The Settings component is a simplified version where you define all your settings at once, but allow for less customisation than the individual components (SLC like).
**NOT ALL OF THESE HAVE BEEN IMPLEMENTED ALREADY**

**ModuleStore/** modal to install/remove components

**Parts/** small individual components that are reusable in other places

**Header.vue** the top navbar

### i18n
currently unused untill i18n plugin installed

### layouts
currently unused, we have 2 pages now (OAuth redirect is second) and they look totally different

### middleware
**titlebar.js** adds the custom tittlebar to the page on page load.

### NoNuxt
page to be shown while updating, might be broken -need to check-. updater might be started before nuxt is initiated

### pages
**connections/callback.vue** OAuth redirect page

**index.vue** main application page

### plugins
**common-filters.js** define filters that can be used in v-bind or mustache operators ( "{{ codehere }}" )

**component-plugin.js** global register all components that need to be available for the modules to use
 
**vue-js-plugins.js** register vue-plugins

**vuex-persist.js** register vuex-persist + define when something does not need to be persisted

### store
you probably can figure this one out after scroll through all the past items

## module examples
the **test** module and the **Notifications** module are the 2 modules I used to test everything,
installing those will allow you to see the same. Installing modules can be done through the module store.

While writing this, installing the **test** module fails to due the sha1 check failing before installing, needs investigation.
Probably is caused by the size of the file as the twitch library is very big. Can be bypassed as developper by manual building
and copy pasting the *mainComp.common.js* to *%appdata%/streamer-buddy/app/modules/CORE/test/*

if a module has a store, it needs to be placed in the store folder of that module and it will be registered/unregistered and persisted
as well. These do not get downloaded currently or copied to the dist folder, so manual copying still needed.

## other fun facts
* for a connect button to show up in the connection manager, the module needs to be enabled
a module will be running if it is selected or if it is enabled (a disabled module that you have selected will act like enabled except for the connect button)

* currently all enabled modules and tabs are rendered in place with the hidden class, this because they get destroyed and recreated while going through a portal.
needs testing if can be hidden in the button with a key to prevent recreation. (allows for better debugging tree)

* as mentioned before, the settings utility funcitons should be refactored to a mixin. also explore possibility to use modifiers for type casting instead of the now custom functions

* TODO: sort modules alphabetically per category (maybe do this in a common-filter)

* i decided to go with webkit custom scrollbars instead backward compatible packages as 1) this is more lightweight 2) doesn't mess up layouting 3) easier. 4)don't need backward compatibility as we use electron

## Build Setup

``` bash
# install dependencies
$ yarn install

# development with vue devtools
$ yarn dev

# build for production
$ yarn build


For detailed explanation on how things work, checkout [Nuxt.js](https://github.com/nuxt/nuxt.js), [Electron.js](https://electronjs.org/), and [electron-builder](https://www.electron.build/).
