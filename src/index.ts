import { wom, context, modules, Mesh, Node, ActiveArea } from "maxwhere";
import { utils } from "@mxw/next";
import { ipcMain } from "electron";
import path from "path";
import { registerEvents } from "./ipc";

let __overlay: MaxWhere.Overlay | null = null;

export const init = function () {};

export const done = function (nodeReturnedByRenderFunction: Node) {};

export const render = function (options: object): any {
  // @ts-ignore
  __overlay = wom.create("overlay", {
    width: wom.appConfig.width,
    height: wom.appConfig.height,
    "resolution-width": wom.appConfig.width,
    "resolution-height": wom.appConfig.height,
    scaleFactor: 1, // do not allow DPI scaling
    // URL to load
    url: path.join(__dirname, "ui", "index.html"), //url: 'https://www.google.com/',
    // accept input events when hovered
    inputDisabled: false,
    nodeIntegration: true,
    contextIsolation: false,
    transparent: true,
    directKeyEvent: false,
    zorder: 45,
    done: (o) => {
      utils.browserDevMode(o, () => {});

      ipcMain.on(
        `set-active-areas-${o.browserWindow.webContents.id}`,
        (e, activeAreas: ActiveArea[]) => {
          o.setActiveAreas(activeAreas);
        }
      );
      o.browserWindow.webContents.executeJavaScript(
        `window._mw_overlay_id = ${o.browserWindow.webContents.id}`
      );

      wom.on("resize", ({ w, h }) => {
        o.setResolution(w, h);
        o.setSize(w, h);
      });
      wom.on("dpi-change", ({ dpi }) => {
        o.setPixelScaleFactor(dpi);
      });
    },
  });

  __overlay.once("ready", () => {
    registerEvents(__overlay as MaxWhere.Overlay);
  });
  return __overlay;
};

export const clear = function () {
  if (__overlay) {
    ipcMain.removeAllListeners(`set-active-areas-${__overlay.browserWindow.webContents.id}`);
    __overlay.clear();
  }
};
