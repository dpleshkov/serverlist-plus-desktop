const pinger = require("starblast-pinger");
const { contextBridge, shell } = require('electron');

// Expose the natively-running starblast-pinger API to ServerList+ which is loaded from the web
contextBridge.exposeInMainWorld(
    'electron',
    {
        pinger: pinger,
        shell: shell,
        appVer: "1.1.0"
    }
)