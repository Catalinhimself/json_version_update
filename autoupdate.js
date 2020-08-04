const fs = require('fs');
var major = 4, minor = 25;

function Update() {
    fs.readFile('/package.json', (err, data) => {
        if (err) throw err;
        //get the  jspn
        let package = JSON.parse(data);
        //get version
        var version = package.version;
        //convert version
        var version = version.split(".");
        for (let i = 0; i < 3; i++) {
            version[i] = Number(version[i]);
        };

        if (version[2] === minor) {
            version[1]++;
            version[2] -= minor;

        };
        if (version[1] === major) {
            version[0]++;
            version[1] -= major;

        };

        version[2]++;

        package.version = version[0] + "." + version[1] + "." + version[2];
        console.log("package version : ", package.version);
        let update = JSON.stringify(package);
        fs.writeFileSync('/package.json', update);
    });

};
module.exports = Update;