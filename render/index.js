/**
 * Render the frames into PNG images
 * An electron app, takes one command line argument `step`
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

var path          = require('path'),
    app           = require('electron').app,
    BrowserWindow = require('electron').BrowserWindow,
    ipcMain       = require('electron').ipcMain;

// Set as global to be read by the web page
global.step = process.argv[2] || 1;

// Hide the Dock for macOS
app.dock.hide();

// Set the display scale factor to 1
app.commandLine.appendSwitch('force-device-scale-factor', 1);

// When the app is ready
app.on('ready', createWindow);

/**
 * Create a hidden browser window and load the rendering page
 */
function createWindow() {

  // Create a browser window
  var win = new BrowserWindow({show: false});

  // Load index.html 
  win.loadURL('file://' + __dirname + '/index.html');

  // Maximize the window
  win.maximize();

}

/**
 * A callback function for the event:
 * When a frame is captured
 * 
 * @param {Number} recordIndex
 */
ipcMain.on('captured', function(recordIndex) {

  console.log(recordIndex);
  
});

/**
 * A callback function for the event:
 * When something unexpected happened
 *
 * @param {String} errorMsg
 */
ipcMain.on('error', function(errorMsg) {

  console.error(errorMsg);
  
});
