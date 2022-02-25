import React, { MouseEvent, useState, useEffect } from "react"
import * as ReactDOM from "react-dom"
import Card from "./components/Card"
import LoadingScreen from "./pages/LoadingScreen"
import MainPage from "./pages/MainPage"

function App() {
	const [cards, setCards] = useState<JSX.Element[]>([])
	const [persistData, setPersistData] = useState(false)
	const [loading, setLoading] = useState(false)
	const [val, setVal] = useState(0)
	const [data, setData] = useState<string[]>(() => {
		const skus = localStorage.getItem("skus")
		return JSON.parse(skus) || []
	})

	// Load data from localStorage
	useEffect(() => {
		// if (persistData) {
		// 	localStorage.setItem("skus", JSON.stringify(data))
		// }
		localStorage.setItem("skus", JSON.stringify(data))
	}, [data])

	useEffect(() => {
		data.forEach(async (sku, i) => {
			console.log(`Loading ${sku} (${i + 1}/${data.length})`)
			const { item, name } = await window.api.getSkuData(sku)
			setCards((cards) => [
				...cards,
				<Card key={i} item={item} name={name} event={deleteCard} />,
			])
			setVal((val) => val + 1)
		})
	})

	const clickHandler = async () => {
		const input = document.getElementById("text-box") as HTMLInputElement
		setLoading(true)
		const { item, name } = await window.api.getSkuData(input.value)
		// setCards([...cards, <Card key={item.sku} item={item} name={name} event={deleteCard}/>])

		setCards([
			...new Set(cards.map((card) => card)),
			<Card key={item.sku} item={item} name={name} event={deleteCard} />,
		])
		setData((prev) => (!data.includes(item.sku) ? [...prev, item.sku] : prev))
		// Don't add duplicate cards
		input.value = ""
		setLoading(false)
	}

	const deleteCard = (e: MouseEvent<HTMLButtonElement>) => {
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
			{/* {cards.length !== data.length ? (
				<LoadingScreen completed={val} skus={data} />
			) : (
				<MainPage event={clickHandler} loading={loading} cards={cards} />
			)} */}
			<MainPage event={clickHandler} loading={loading} cards={cards} />
		</>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
