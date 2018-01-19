const exec = require('child_process').exec

const runBash = () => {
    const dir = exec("ls -la", function(err, stdout, stderr) {
        if (err) {
            // should have err.code here?  
        }
        console.log(stdout);
    });
    
    dir.on('exit', function (code) {
        return 0
    });
}

module.exports = runBash