declare module '*.jpg' {
	const value: any
	export default value
}
declare module '*.png'
declare module '*.svg'


// declare a module for audio files
declare module '*.mp3' {
	const src: string
	export default src
}