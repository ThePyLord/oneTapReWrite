declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

import { api } from '../electron/preload'

declare global {
	interface Window {api: typeof api}
}