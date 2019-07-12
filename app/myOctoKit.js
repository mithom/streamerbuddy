const throttling = require('@octokit/plugin-throttling')
const retry = require('@octokit/plugin-retry')
const Octokit = require('@octokit/rest')
const app = require('electron').app || require('electron').remote.app

const MyOctokit = Octokit.plugin([retry, throttling]) //retry requests up to 3 times for recoverable errors

module.exports.owner = 'StreamerBuddy'
module.exports.repo = 'streamerbuddy-store'

const octokit = MyOctokit({
  userAgent:`streamerBuddy v${app.getVersion()}`,
  throttle: {
    onRateLimit:(retryAfter, options) => {
      if(options.requests.retryCount === 0){
        return true
      }
    },
    onAbuseLimit: (retryAfter, options) =>{octokit.log.warn(`Abuse limit reached for request ${options.method} ${options.url}`)}
  }
})

module.exports.octokit = octokit