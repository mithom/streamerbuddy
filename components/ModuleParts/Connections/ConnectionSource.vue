<template>
    <div>
        <portal
            v-if="$store.state.moduleState[moduleName] && allowNewConnection"
            to="addConnection"
        >
            <NewConnection
                :module-name="moduleName"
                :client-id="clientId"
                :access-token-url="accessTokenUrl"
                :authorization-url="authorizationUrl"
                :scopes="scopes"
                :query="query"
                :body="body"
                :headers="headers"
                :allow-multiple="allowMultiple"
            >
                <slot />
            </NewConnection>
        </portal>
        <template
            v-if="true"
        >
            <portal
                v-for="(connection, id) of connections"
                :key="id"
                to="connections"
            >
                <Connection
                    :connection="connection"
                    :client-id="clientId"
                    :connection-id="id"
                />
            </portal>
        </template>
    </div>
</template>

<script>
import {moduleName} from '~/app/component-util'
import NewConnection from './NewConnection'
import Connection from './Connection'

export default {
  name: "ConnectionSource",
  components: {Connection, NewConnection},
  model:{
    prop: 'connections',
    event: 'input'
  },
  props:{
    clientId:{
      type: String,
      required: true
    },
    accessTokenUrl:{
      type: String,
      default: null
    },
    authorizationUrl:{
      type: String,
      required: true
    },
    scopes:{
      type: Array,
      required: true
    },
    query:{
      type: Object,
      default: ()=>{}
    },
    body:{
      type: Object,
      default: ()=>{}
    },
    headers:{
      type: Object,
      default: ()=>{}
    },
    allowMultiple:{
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      moduleName: moduleName(this)
    }
  },
  computed:{
    allowNewConnection(){
      return this.allowMultiple || !this.connections
    },
    connections(){
      const _connections = this.$store.state.connections.access_tokens[this.clientId] || []
      this.$emit('input', _connections)
      return _connections
    }
  },
}
</script>

<style scoped>

</style>
