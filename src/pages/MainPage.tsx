import React, { MouseEvent, useState, useEffect } from "react"
import Header from "../components/Header"
import Card from "../components/Card"

interface MainProps {
	event: () => void
	loading: boolean
	cards: JSX.Element[]
}

function MainPage({
	event: clickHandler,
	loading,
	cards,
}: MainProps): JSX.Element {
	const deleteCard = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault()
		const cards = document.getElementById("cards") as HTMLDivElement
		cards.removeChild(e.currentTarget.parentElement)
	}

	const dummyCard = (
		<Card
			name="Samsung Galaxy Book Go"
			item={{
				sku: "12345",
				stockInfo: "In Stock",
				imgUrl:
					"https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15736/15736356.jpg",
				quantity: 10,
			}}
			event={deleteCard}
		/>
	)

	return (
		<>
			<Header />
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
			<div className="cards" id="cards">
				{cards.length !== 0 && Array(10).fill(dummyCard)}
			</div>
		</>
	)
}

export default MainPage
