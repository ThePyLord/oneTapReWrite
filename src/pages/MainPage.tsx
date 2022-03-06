import React, { MouseEvent, useState, useEffect } from "react"
import Header from "../components/Header"
import Card from "../components/Card"
import { Product } from "../app/sku"
import Modal, { ModalType } from "../components/Modal"

interface MainProps {
	event: () => void
	loading: boolean
	gotError: Error
	data: { item: Product; name: string }[]
}

function MainPage({
	event: clickHandler,
	loading,
	gotError,
	data,
}: MainProps): JSX.Element {
	const [openModal, setOpenModal] = useState(true)
	const deleteCard = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault()
		const cards = document.getElementById("cards") as HTMLDivElement
		cards.removeChild(e.currentTarget.parentElement)
	}
	useEffect(() => {
		if (gotError) {
			setOpenModal(true)
		}
	}, [gotError])

	const arr = Array(10).fill(0)
	const dummyCards = arr.map((_, i) => (
		<Card
			key={i}
			name="Samsung Galaxy Book Go"
			item={{
				sku: "15736356",
				stockInfo: "In Stock",
				imgUrl:
					"https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15736/15736356.jpg",
				quantity: 10,
			}}
			event={deleteCard}
		/>
	))

	return (
		<>
			<Header />
			{openModal ||
				(gotError && (
					<Modal
						message={gotError?.message}
						type={ModalType.ERROR}
						closeModal={() => setOpenModal(false)}
					/>
				))}
			<section className="input">
				<input
					type="text"
					className="text-input"
					name="SKU Search"
					id="text-box"
					placeholder="Paste SKU/Web Code here"
				/>
				<button type="submit" className="btn info" onClick={clickHandler}>
					Submit
				</button>
			</section>
			{loading && <p>Retrieving product...</p>}
			<button className="btn" onClick={() => setOpenModal((val) => !val)}>
				Click here
			</button>
			<div className="cards" id="cards">
				{dummyCards}
				{data.map(({ item, name }) => (
					<Card key={item.sku} item={item} name={name} event={deleteCard} />
				))}
			</div>
		</>
	)
}

export default MainPage
