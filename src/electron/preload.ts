import { ipcRenderer, contextBridge } from "electron"
import { Product } from "../app/sku"

const windowFunctions = {
	minimize: () => ipcRenderer.send("app/minimize"),
	maximize: () => ipcRenderer.send("app/maximize"),
	close: () => ipcRenderer.send("app/close"),
	// moveToBrowser: (): void => ipcRenderer.send('popout', )
}

interface skuRes {
	item: Product
	name: string
	error: Error | null
}

export const api = {
	createWin: (): void => {
		ipcRenderer.invoke("user-init")
	},
	sayHello: (): void => {
		console.log("Hello")
	},
	getSkuData: (sku: string, short = true): Promise<skuRes> =>
		ipcRenderer.invoke("get-sku-data", sku),
	windowFunctions,
}

console.log("Preload loaded")
contextBridge.exposeInMainWorld("api", api)
