const path = require('path');
const exec = require('child_process').exec;
const pathPrefix = process.env.ELECTRON_ENV === 'development' ? '' : process.resourcesPath;
const scriptPath = path.resolve(pathPrefix, './scripts/deploy_osx.sh');
// const cmd = '/usr/bin/osascript -e \'do shell script "echo some_command" with administrator privileges\'';
// exec(cmd);
const runBash = (cb) => exec(scriptPath, cb);

module.exports = runBash;
