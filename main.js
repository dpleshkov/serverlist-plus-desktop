const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = function() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        },
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: 'rgba(255, 255, 255, 0)',
            symbolColor: '#EC2B7A'
        }
    });

    mainWindow.maximize();
    mainWindow.loadURL("https://starblast.dankdmitron.dev/electron").then();
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Not quit the app when all windows are closed on Mac as per convention, but quit it on other platforms
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
