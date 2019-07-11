const app = require('electron').app || require('electron').remote.app
const path = require('path')

exports.modules_path = path.join(app.getPath('userData'), 'app', 'modules/')
exports.module_info = 'module.json'