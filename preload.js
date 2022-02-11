const pinger = require("starblast-pinger");
const { contextBridge, ipcRenderer, shell } = require('electron');

let translateColor = function(hue) {
    if (hue >= 0 && hue < 30) {
        return "Red";
    } else if (hue >= 30 && hue < 60) {
        return "Orange";
    } else if (hue >= 60 && hue < 90) {
        return "Yellow";
    } else if (hue >= 90 && hue < 150) {
        return "Green";
    } else if (hue >= 150 && hue < 270) {
        return "Blue";
    } else if (hue >= 270 && hue < 300) {
        return "Purple";
    } else if (hue >= 300 && hue < 360) {
        return "Pink";
    }
    return "Red";
}

let rateStack = function(systemInfo) {
    if (systemInfo.mode.id !== "team") {
        return;
    }
    let ECPCounts = {};
    for (let playerID of Object.keys(systemInfo.players)) {
        let player = systemInfo.players[playerID];
        if (!ECPCounts[translateColor(player.hue)]) {
            ECPCounts[translateColor(player.hue)] = 0;
        }
        if (player.custom) {
            ECPCounts[translateColor(player.hue)]++;
        }
    }
    return ECPCounts;
}

let getStackRating = function(systemInfo) {
    let stack = rateStack(systemInfo);
    let max = Object.keys(stack)[0];
    let min = Object.keys(stack)[1];
    for (let team of Object.keys(stack)) {
        if (stack[team] > stack[max]) {
            max = team;
        }
        if (stack[team] < stack[min]) {
            min = team;
        }
    }
    if (min === max) {
        return "Unavailable"
    }
    delete stack[max];
    delete stack[min];
    let mid = Object.keys(stack)[0];
    stack = rateStack(systemInfo);
    if (!mid) {
        if (stack[max] - stack[min] >= 9) {
            return `${max} is very stacked (${stack[max]} ${max}, ${stack[min]} ${min})`;
        } else if (stack[max] - stack[min] >= 6) {
            return `${max} is stacked (${stack[max]} ${max}, ${stack[min]} ${min})`;
        } else if (stack[max] - stack[min] >= 3) {
            return `${max} is slightly stacked (${stack[max]} ${max}, ${stack[min]} ${min})`;
        } else {
            return `Fair (${stack[max]} ${max}, ${stack[min]} ${min})`;
        }
    }
    if (stack[max] - stack[mid] >= 9) {
        return `${max} is very stacked (${stack[max]} ${max}, ${stack[mid]} ${mid}, ${stack[min]} ${min})`;
    } else if (stack[max] - stack[mid] >= 6) {
        return `${max} is stacked (${stack[max]} ${max}, ${stack[mid]} ${mid}, ${stack[min]} ${min})`;
    } else if (stack[max] - stack[mid] >= 3) {
        return `${max} is slightly stacked (${stack[max]} ${max}, ${stack[mid]} ${mid}, ${stack[min]} ${min})`;
    } else {
        return `Fair (${stack[max]} ${max}, ${stack[mid]} ${mid}, ${stack[min]} ${min})`;
    }
}

contextBridge.exposeInMainWorld(
    'electron',
    {
        ipcRenderer: ipcRenderer,
        pinger: pinger,
        shell: shell,
        getStackRating: getStackRating
    }
)