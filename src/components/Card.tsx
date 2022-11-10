import React from 'react'
import styles from '../styles/Card.module.css'

export interface CardProps {
	name: string
	item: {
		sku: string // SKU of the product
		stockInfo: string // e.g. 'In Stock'
		imgUrl: string // URL to image
		quantity: number // number of items left in stock
	}
	onDelete: (id: string) => void
}

function Card(props: CardProps): JSX.Element {
	const { name, item, onDelete } = props
	const altText = `${name} ${item.sku}`
	const quantityText = `Amount in stock: ${item.quantity.toLocaleString('en')}`
	const imgUrl = item.imgUrl.endsWith('.jpg') ? item.imgUrl : `data:image/png;base64,${item.imgUrl}`

	return (
		<div className={styles.card}>
			<span className={styles.remove} onClick={() => onDelete(item.sku)}>
				&times;
			</span>
			<h1 className={styles.productName}>{name}</h1>
			<h4 className='small-header sku'>SKU/Web Code: {item.sku}</h4>
			<img className={styles.productImage} src={imgUrl} alt={altText} />
			<h4 className='small-header'>{quantityText}</h4>
		</div>
	)
}

export default Card
