// @ts-ignore
const ipcRenderer = window.require('electron').ipcRenderer as Electron.IpcRenderer
// import { ipcRenderer } from 'electron'

export function getPing() {
  // @ts-ignore
  return ipcRenderer.invoke(`ping-${window._mw_overlay_id}`, null)
}
