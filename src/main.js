const { app, BrowserWindow, ipcMain } = require('electron');
const sharp = require('sharp');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load index.html
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('formSubmit', async (event, folders, format) => {
    try {
      for (const folder of folders) {
        const files = await sharp(folder)
            .toFormat(format)
            .toFile(outputFilePath);
        
        console.log(`Conversion successful for ${files.length} files in ${folder}`);
      }
      
      event.reply('conversionSuccess');
    } catch (err) {
      console.error('Conversion failed:', err);
      event.reply('conversionError');
    }
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})