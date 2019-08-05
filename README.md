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

## Build Setup

``` bash
# install dependencies
$ yarn install

# development with vue devtools
$ yarn dev

# build for production
$ yarn build

For detailed explanation on how things work, checkout [Nuxt.js](https://github.com/nuxt/nuxt.js), [Electron.js](https://electronjs.org/), and [electron-builder](https://www.electron.build/).
