import React, { createRef, useEffect, useState } from 'react'
import { Product } from '../app/sku'
import song from '../assets/Gunna - GIMMICK.mp3'
import Card from '../components/Card'
import Header from '../components/Header'
import Modal, { ModalType } from '../components/Modal'
import '../styles/MainPage.css'


interface IError {
	err: { heading: string, errMsg: string }
	type: ModalType
}


function MainPage(): JSX.Element {
	const inputRef = createRef<HTMLInputElement>()
	const cardsRef = createRef<HTMLDivElement>()
	const [itemCard, setItemCard] = useState<{ item: Product; name: string }[]>([])
	const [openModal, setOpenModal] = useState(false)
	const [err, setErr] = useState<IError>(null)
	const [data, setData] = useState<string[]>(() => {
		const skus = localStorage.getItem('skus')
		return JSON.parse(skus) || []
	})
	const [fullData, setFullData] = useState<typeof itemCard>(JSON.parse(localStorage.getItem('fullData')) || [])
	const [loading, setLoading] = useState(false)
	const deleteCard = (id: string): void => {
		const newCards = itemCard.filter(({ item }) => item.sku !== id)
		setItemCard(newCards)
	}
	useEffect(() => {
		if (err) {
			setOpenModal(true)
		}
	}, [err])



	const onClick = async () => {
		setLoading(true)
		try {
			if (inputRef.current) {
				const sku = inputRef.current.value
				if (data.some((item) => item === sku)) {
					throw new Error(`${sku} is already in the list`)
				}
				else {
					const { error, name, item } = await window.api.getSkuData(inputRef.current.value)
					if (!error) {
						console.log({ name, item })
						setItemCard((cards) => [...cards, { item, name }])
						setData([...new Set(data), sku])
						setFullData([...new Set(fullData), { item, name }])
					}
					else {
						console.log('High fashion feel like fly ish I\'m chilling in.')
						setErr({
							err: {
								heading: 'Item doesn\'t exist',
								errMsg: `SKU: ${sku} doesn't exist`
							},
							type: ModalType.ERROR
						})
					}
					setLoading(false)
				}
				setLoading(false)
				setTimeout(() => {
					// console.log("Delayed for 1 second.")
					if (inputRef.current)
						inputRef.current.value = ''
				}, 1000)
			}
		} catch (error) {
			setErr({ err: { heading: 'failed to get data', errMsg: `SKU doesn't exist` }, type: ModalType.INFO })
			setLoading(false)
		}
	}

	useEffect(() => {
		// create a new audio context
		const audioCtx = new AudioContext()
		// create a buffer source node
		const audioElement = document.getElementById('audio') as HTMLAudioElement
		const audioSrc = audioCtx.createMediaElementSource(audioElement)
		// connect the audio element to the graph
		audioSrc.connect(audioCtx.destination)
		// play the audio
		audioElement.play()
	}, [])

	const arr = Array(10).fill(0)
	const dummyCards = arr.map((_, i) => (
		<Card
			key={i}
			name='Samsung Galaxy Book Go'
			item={{
				sku: '15736356',
				stockInfo: 'In Stock',
				// imgUrl: lilBaby,
				imgUrl: 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15736/15736356.jpg',
				quantity: 10,
			}}
			onDelete={deleteCard}
		/>
	))

	return (
		<div>
			<Header />
			{openModal /* && err */ && (
				<Modal
					heading={err.err.heading}
					message={err.err.errMsg}
					type={err.type}
					closeModal={() => setOpenModal(false)}
					show={openModal}
				/>
			)}
			<section className='input'>
				<input
					type='text'
					className='text-input'
					name='SKU Search'
					id='text-box'
					placeholder='Paste SKU/Web Code here'
					ref={inputRef}
				/>
				<button type='submit' className='btn info' onClick={onClick}>
					Submit
				</button>
			</section>
			<audio id='audio' src={song} />
			{loading && <p>Retrieving product...</p>}
			<div className='cards' id='cards' ref={cardsRef}>
				{itemCard.map(({ item, name }) => (
					<Card key={item.sku} item={item} name={name} onDelete={deleteCard} />
				))}
			</div>
		</div>
	)
}

export default MainPage
