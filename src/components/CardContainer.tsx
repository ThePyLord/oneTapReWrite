import * as React from "react"
import { useState, useEffect } from "react"
import Card, { CardProps } from "./Card"

function CardContainer(props: CardProps): JSX.Element {
	const [cards, setCards] = useState([])
	useEffect(() => {
		fetch("https://api.pokemontcg.io/v1/cards")
			.then((res) => res.json())
			.then((data) => {
				setCards(data.cards)
			})
	})
	return (
		<div className="cards">
			<Card
				name={props.name}
				item={{
					sku: '12345',
					stockInfo: "In Stock",
					imgUrl:
						"https://cdn.discordapp.com/attachments/789345259011178548/943308990685773854/Activities3305.png",
					quantity: 10,
				}}
				event={props.event}
			/>
		</div>
	)
}

export default CardContainer
