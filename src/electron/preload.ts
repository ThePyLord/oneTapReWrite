import { ipcRenderer, contextBridge } from 'electron'
import { Product } from '../app/sku'

const windowFunctions = {
	minimize: () => ipcRenderer.send('app/minimize'),
	maximize: () => ipcRenderer.send('app/maximize'),
	close: () => ipcRenderer.send('app/close'),
	// moveToBrowser: (): void => ipcRenderer.send('popout', )
}

export const api = {
	createWin: (): void => {
		ipcRenderer.invoke('user-init')
	},
	sayHello: (): void => {
		console.log('Hello')
	},
	getSkuData: (sku: string, short=true): Promise<{item: Product, name: string}> => ipcRenderer.invoke('get-sku-data', sku),
	windowFunctions,
}

contextBridge.exposeInMainWorld('api', api)