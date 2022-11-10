import React, { useEffect, useState } from 'react'
import styles from '../styles/Loading.module.css'

function LoadingScreen({
	skus,
	completed,
}: {
	skus?: string[]
	completed: number
}) {
	useEffect(() => {
		const interval = setInterval(() => {
			const bar = document.getElementById('bar')
			const computedStyle = getComputedStyle(bar).getPropertyValue('--width')
			const width = parseFloat(computedStyle) || 0

			bar.style.setProperty('--width', `${width + 0.1}`)
			bar.dataset.label = `${Math.floor(width)}%`
			bar.style.setProperty('--colour', `rgb(0, ${Math.floor(width * 2)}, 120)`)
			if (width > 100) clearInterval(interval)
		}, 5)
		// const bar = document.getElementById('bar')
		// const compStyle = getComputedStyle(bar).getPropertyValue('--width')
		// const w = parseInt(compStyle) || 0
		// console.log(`The width is ${w}`)

		// const total = skus.length
		// bar.style.setProperty('--width', `${((w + completed) / total) * 100}`)
		// bar.dataset.label = `${(w + completed) / total}%`
		console.log(`There's ${completed} skus loaded`)
	})
	return (
		<section className={styles.loading}>
			{/* <h1 className={styles.loading_text}>Gathering saved product data...</h1> */}
			<h1 className={styles.loading_text}>ONE TAP BUY</h1>
			<div className={styles.bar} id='bar' data-label='Loading...'></div>
		</section>
	)
}

export default LoadingScreen
