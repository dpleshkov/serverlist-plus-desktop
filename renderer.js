window.onmessage = function(evt) {
    if (typeof evt.data === "string" && evt.data[0] === "p") {
        console.log(evt.data);
        let id = evt.data.substr(1);
        electron.pinger.getSystemInfo(`https://starblast.io/#${id}`, true, 250).then(status => {
            status.stackRating = electron.getStackRating(status);
            let iframe = document.getElementById("serverlistplus");
            console.log(`p${JSON.stringify(status)}`);
            iframe.contentWindow.postMessage(`p${JSON.stringify(status)}`, "*");
        });
    } else if (typeof evt.data === "string" && evt.data[0] === "l") {
        let href = evt.data.substr(1);
        electron.shell.openExternal(href);
    }
}

