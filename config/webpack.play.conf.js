require('dotenv').config()
const EnvPlugin = require('inline-environment-variables-webpack-plugin')

module.exports = {
  plugins: [
    new EnvPlugin()
  ]
}
