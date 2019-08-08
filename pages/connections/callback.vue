<template>
    <h1>Fetching token</h1>
</template>
<script>
import ClientOAuth2 from 'client-oauth2'
import {ipcRenderer} from 'electron'

const data = new Promise(resolve =>{
  ipcRenderer.on('authData', (event, options)=>{
    resolve(options)
  })
})

ipcRenderer.send('requestAuthData')

export default {
  name: "Callback",
  async created() {
    const options = await data
    if (this.$dateFns.isAfter(options?.validUntil, new Date())) {
      const OAuthClient = new ClientOAuth2({
        redirectUri: `${process.env.baseUrl}/connections/callback`
      })
      return new Promise((resolve, reject)=>{
        console.log('fetching access token')
        OAuthClient.token.getToken({
          pathname: this.$route.path,
          query: this.$route.query,
          hash: this.$route.hash,
        }, options).then(
          function(user){
            console.log(user)
            ipcRenderer.send('finishAuth', user)
            resolve()
            window.close()
          }
        ).catch(()=>reject('something went wrong during authentication'))
      })
    }else{
      alert('no valid auth query')
    }
  }
}
</script>

<style scoped>

</style>