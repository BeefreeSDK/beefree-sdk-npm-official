const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

function resolvePath(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolvePath)

module.exports = {
  integration: resolvePath('integration'),
  integrationHtml: resolvePath('integration/index.html'),
  integrationIndexJs: resolvePath('src/integration.js'),
  appPackageJson: resolvePath('package.json'),
  appNodeModules: resolvePath('node_modules'),
  ownNodeModules: resolvePath('node_modules'),
  nodePaths,
}
