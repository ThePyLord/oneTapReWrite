import React, { MouseEvent, useState, useEffect } from "react"
import * as ReactDOM from "react-dom"
import { Product } from "./app/sku"
import LoadingScreen from "./pages/LoadingScreen"
import MainPage from "./pages/MainPage"

function App() {
	const [itemCard, setItemCard] = useState<{ item: Product; name: string }[]>(
		[]
	)
	const [persistData, setPersistData] = useState(false)
	const [loading, setLoading] = useState(false)
	const [err, setErr] = useState<Error>(null)
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

	// useEffect(() => {
	// 	data.forEach(async (sku, i) => {
	// 		console.log(`Loading ${sku} (${i + 1}/${data.length})`)
	// 		const { item, name } = await window.api.getSkuData(sku)
	// 		setCards((cards) => [
	// 			...cards,
	// 			<Card key={i} item={item} name={name} event={deleteCard} />,
	// 		])
	// 		setVal((val) => val + 1)
	// 	})
	// })

	const clickHandler = async () => {
		const input = document.getElementById("text-box") as HTMLInputElement
		setLoading(true)

		const { item, name, error } = await window.api.getSkuData(input.value)
		if (!error) {
			if (!itemCard.includes({ item, name })) {
				setItemCard([...itemCard, { item, name }])
			}
			console.log(itemCard)
		} else {
			setErr(error)
		}
		// setCards([
		// 	...new Set(cards.map((card) => card)),
		// 	<Card key={item.sku} item={item} name={name} event={deleteCard} />,
		// ])
		// Don't add duplicate cards
		input.value = ""
		setLoading(false)
	}

	return (
		<>
			{/* {cards.length !== data.length ? (
				<LoadingScreen completed={val} skus={data} />
			) : (
				<MainPage event={clickHandler} loading={loading} data={itemCard} />
			)} */}
			<MainPage
				event={clickHandler}
				loading={loading}
				data={itemCard}
				gotError={err}
			/>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
