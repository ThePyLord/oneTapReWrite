/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { load } from 'cheerio'

/**
 * @typedef {Object} Product
 * @property {string} quantity - The quantity of the product remaining
 * @property {string} stockInfo - The stock status of the product
 * @property {string|null} stockLimit - The stock limit of the product
 * @property {string} imgUrl - The url of the product image
 * @property {string} productUrl - The url of the product
 */
export interface Product {
	quantity: number,
	stockInfo: string,
	stockLimit: string|null,
	imgUrl: string,
	productUrl: string
	sku: string
}
/**
 * Find the product info from the API
 * @param {string} sku - The unique product ID/Web code or SKU of a product
 * @returns {Promise<Product>} Promise object represents the product info
 */
export async function getProduct(sku: string): Promise<Product> {
	const url = 'https://www.bestbuy.ca/ecomm-api/availability/products?accept=application%2Fvnd.bestbuy.standardproduct.v1%2Bjson&accept-language=en-CA&skus='+ sku
	const {data} = await axios.get(url, {
		headers: {
			'authority': 'www.bestbuy.ca',
			'accept': '*/*',
			'accept-language': 'en-US,enq=0.9',
			"sec-fetch-site": 'same-origin',
			"sec-fetch-mode": 'cors',
			"sec-fetch-dest": 'empty',
		}
	})
	
	// const {data} = await axios({
	// 	method: 'GET',
	// 	url: `https://www.bestbuy.ca/ecomm-api/availability/products?accept=application%2Fvnd.bestbuy.standardproduct.v1%2Bjson&accept-language=en-CA&skus=${sku}`,
	// 	headers: {
	// 		authority: 'www.bestbuy.ca',
	// 		accept: '*/*',
	// 		'accept-language': 'en-US,enq=0.9',
	// 		"sec-fetch-site": 'same-origin',
	// 		"sec-fetch-mode": 'cors',
	// 		"sec-fetch-dest": 'empty',
	// 	}
	// })
	const {availabilities} = data
	const item = {
		quantity: availabilities[0].shipping.quantityRemaining || 'N/A',
		stockInfo: availabilities[0]['shipping']['status'],
		stockLimit: availabilities[0]['shipping']['orderLimit'],
		imgUrl:`https://multimedia.bbycastatic.ca/multimedia/products/500x500/${availabilities["0"]["sku"].toString().substr(0, 3)}/${availabilities["0"]["sku"].toString().substr(0, 5)}/${availabilities["0"]["sku"]}.jpg`,
		productUrl: `https://www.bestbuy.ca/en-ca/product/${availabilities["0"]["sku"]}`,
		sku: availabilities["0"]["sku"],
	}
	return item
}

/**
 * Returns the product name
 * @param {string} url The url for the product
 * @param {boolean} short Whether to shorten the name or not
 * @returns {Promise<string>} Promise object represents the product name
 */
export async function getProdName(url: string, short=true) {
	const { data } = await axios.get(url)
	const $ = load(data)
	const prodName = $("h1").text()
	if(short) 
		return shortenName(prodName)
	else
		return prodName
}
/**
 * Shortens the product name
 * @param {string} name The name of the product
 * @returns {string} The shortened name of the product
 */
function shortenName(name: string): string {
	const shortName = name.split(" ").slice(0, 4).join().replace(/,/g, " ")
	return shortName
}

export async function validateSKU(sku:string) {

	return (sku.length === 8 && sku.match(/^[0-9]+$/))
}

const testSkus = [
	"14575596",
	"14583636",
	"15317229",
	"15178453",
	"13444247",
	"15615205",
	"15317355",
	"15736356",
]


// async function main() {
// 	console.log(await getProduct('15614016'))
// }
// main()