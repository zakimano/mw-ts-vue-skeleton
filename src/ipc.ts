import { ipcMain } from "electron";

export function registerEvents(overlay: MaxWhere.Overlay) {
  // handle "ping" request coming from renderer (example for IPC communication)
  ipcMain.handle(`ping-${overlay.browserWindow.webContents.id}`, () => {
    return "pong";
  });
}
