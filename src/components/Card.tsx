import * as React from "react"

export interface CardProps {
	name: string
	item: {
		sku: string // SKU of the product
		stockInfo: string // e.g. "In Stock"
		imgUrl: string // URL to image
		quantity: number // number of items left in stock
	}
}
	
function Card(props: CardProps): JSX.Element {
	
	const {name, item} = props
	const altText = `${name} ${item.sku}`
	const quantityText = `Amount in stock: ${item.quantity.toLocaleString('en')}`


	return (
		<div className="card auto">
			<span className="remove">&times;</span>
			<h1 className="product-name">{name}</h1>
			<h4 className="small-header sku">{item.sku}</h4>
			<img className="product-image" src={item.imgUrl} alt={altText} />
			<h4 className="small-header">{quantityText}</h4>
		</div>
	)
}

export default Card
