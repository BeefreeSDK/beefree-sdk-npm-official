/* eslint-disable */
// This is part of the boilerplate that are use in create-react-app
process.env.NODE_ENV = 'development'
require('dotenv').config({ silent: true })
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const historyApiFallback = require('connect-history-api-fallback')
const httpProxyMiddleware = require('http-proxy-middleware')
const detect = require('detect-port')
const config = require('../config/webpack.config.dev')
const paths = require('../config/paths')

function checkRequiredFiles(files) {
  var currentFilePath;
  try {
    files.forEach(filePath => {
      currentFilePath = filePath;
      fs.accessSync(filePath, fs.F_OK);
    });
    return true;
  } catch (err) {
    var dirName = path.dirname(currentFilePath);
    var fileName = path.basename(currentFilePath);
    console.log(chalk.red('Could not find a required file.'));
    console.log(chalk.red('  Name: ') + chalk.cyan(fileName));
    console.log(chalk.red('  Searched in: ') + chalk.cyan(dirName));
    return false;
  }
}

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.integrationHtml, paths.integrationIndexJs])) {
  process.exit(1)
}

const DEFAULT_PORT = process.env.PORT || 3030
let compiler
let handleCompile

var friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// Cleans up webpack error messages.
function formatMessage(message) {
  var lines = message.split('\n');

  if (lines[0].lastIndexOf('!') !== -1) {
    lines[0] = lines[0].substr(lines[0].lastIndexOf('!') + 1);
  }

  if (!lines[0] || !lines[1]) {
    return lines.join('\n');
  }

  if (lines[1].indexOf('Module not found: ') === 0) {
    lines = [
      lines[0],
      lines[1]
        .replace("Cannot resolve 'file' or 'directory' ", '')
        .replace('Cannot resolve module ', '')
        .replace('Error: ', ''),
      '',
      lines[lines.length - 1],
    ];
  }

  if (lines[1].indexOf('Module build failed: ') === 0) {
    var errorText = lines[1].substr('Module build failed: '.length);
    var cleanedLines = [];
    var hasReachedDuplicateMessage = false;
    lines.forEach(function(line, index) {
      if (
        index !== 1 &&
        line.length >= errorText.length &&
        line.indexOf(errorText) === line.length - errorText.length
      ) {
        hasReachedDuplicateMessage = true;
      }
      if (
        !hasReachedDuplicateMessage ||
        index === lines.length - 1
      ) {
        cleanedLines.push(line)
      }
    });
    lines = cleanedLines;
    lines[1] = lines[1].replace(
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    );
  }
  message = lines.join('\n');
  message = message.replace(
    /^\s*at\s((?!webpack:).)*:\d+:\d+[\s\)]*(\n|$)/gm,
    ''
  );

  return message;
}


function formatWebpackMessages(json) {
  const formattedErrors = json.errors.map(function(message) {
    return 'Error in ' + formatMessage(message)
  });
  const formattedWarnings = json.warnings.map(function(message) {
    return 'Warning in ' + formatMessage(message)
  });
  const result = {
    errors: formattedErrors,
    warnings: formattedWarnings,
  };
  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    // This prevents a confusing ESLint parsing error
    // preceding a much more useful Babel syntax error.
    result.errors = result.errors.filter(isLikelyASyntaxError)
  }
  return result;
}

function setupCompiler(host, port, protocol) {
  compiler = webpack(config, handleCompile)

  compiler.plugin('invalid', function() {
    console.log('Compiling...')
  });

  compiler.plugin('done', function(stats) {
    const messages = formatWebpackMessages(stats.toJson({}, true))
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'))
      console.log()
      console.log('The app is running at:')
      console.log()
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'))
      console.log()
      console.log('Note that the development build is not optimized.')
      console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.')
      console.log()
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'))
      console.log()
      messages.errors.forEach(message => {
        console.log(message)
        console.log()
      })
      return
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'))
      console.log()
      messages.warnings.forEach(message => {
        console.log(message)
        console.log()
      })
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.')
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.')
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.')
    }
  })
}

function onProxyError(proxy) {
  return function(err, req, res){
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    )
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    )
    console.log()
    if (res.writeHead && !res.headersSent) {
        res.writeHead(500);
    }
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    )
  }
}

function addMiddleware(devServer) {
  const proxy = require(paths.appPackageJson).proxy;
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*']
  }));
  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(chalk.red('When specified, "proxy" in package.json must be a string.'))
      console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'))
      console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'))
      process.exit(1)
    }
    const mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/
    devServer.use(mayProxy,
      httpProxyMiddleware(pathname => mayProxy.test(pathname), {
        target: proxy,
        logLevel: 'silent',
        onError: onProxyError(proxy),
        secure: false,
        changeOrigin: true
      })
    )
  }
  devServer.use(devServer.middleware)
}

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    contentBase: paths.integration,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === "https",
    host: host
  });

  addMiddleware(devServer)

  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    //openBrowser(protocol + '://' + host + ':' + port + '/');
  });
}

function run(port) {
  var protocol = process.env.HTTPS === 'true' ? "https" : "http"
  var host = process.env.HOST || 'localhost'
  setupCompiler(host, port, protocol)
  runDevServer(host, port, protocol)
}

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  var question =
    chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.') +
    '\n\nWould you like to run the app on another port instead?';

  prompt(question, true).then(shouldChangePort => {
    if (shouldChangePort) {
      run(port);
    }
  })
})
