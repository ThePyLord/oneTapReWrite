import React, { MouseEvent } from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';
import Card from './components/Card'
import Header from './components/Header';



function App() {
	const [cards, setCards] = useState([])
	const [persistData, setPersistData] = useState(false)
	const [loading, setLoading] = useState(false)

	// Load data from localStorage
	useEffect(() => {
		if (persistData) {
			const data = localStorage.getItem('skus')
			if (data) {
				setCards(JSON.parse(data))
			}
		}
	}, [persistData])

	const clickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		const input = document.getElementById('text-box') as HTMLInputElement
		e.preventDefault()
		setLoading(true)
		const {item, name} = await window.api.getSkuData(input.value)
		setCards([...cards, <Card key={item.sku} item={item} name={name} />])
		input.value = ''
	}


	return (
		<div>
			<Header />
			<input type="text" className='text-input' name="SKU Search" id="text-box" placeholder='Paste SKU/Web Code here' />
			<button type="submit" className='btn btn-info' onClick={clickHandler}>Submit SKU</button>
			<div className="cards" id='cards'>
				{cards}
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))