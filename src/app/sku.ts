/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
// import { Blob } from 'node:buffer'
// import { URL } from 'node:url'
// import fs from 'fs'
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
	quantity: number
	stockInfo: string
	stockLimit: string | null
	imgUrl: string
	productUrl: string
	sku: string
}
/**
 * Find the product info from the API
 * @param {string} sku - The unique product ID/Web code or SKU of a product
 * @returns {Promise<Product>} Promise object represents the product info
 */
export async function getProduct(sku: string): Promise<Product> {
	const url =
		'https://www.bestbuy.ca/ecomm-api/availability/products?accept=application%2Fvnd.bestbuy.standardproduct.v1%2Bjson&accept-language=en-CA&skus=' +
		sku
	const { data, status } = await axios.get(url, {
		headers: {
			authority: 'www.bestbuy.ca',
			accept: '*/*',
			'accept-language': 'en-US,enq=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'cors',
			'sec-fetch-dest': 'empty',
		},
	})
	if(status === 200) {
		const { availabilities } = data
		const item = {
			quantity: availabilities[0].shipping.quantityRemaining || 'N/A',
			stockInfo: availabilities[0]['shipping']['status'],
			stockLimit: availabilities[0]['shipping']['orderLimit'],
			imgUrl: '', // setting imgUrl to empty string for now, will be set later
			productUrl: `https://www.bestbuy.ca/en-ca/product/${availabilities['0']['sku']}`,
			sku: availabilities['0']['sku'],
		}
		// set img url using product url
		item.imgUrl = await extractImgUrl(item.productUrl)
		// console.log('url:', item.productUrl)
		const request = await axios.post('http://localhost:5000/remove_bg', {
			url: item.imgUrl,
			message: `Removing background from ${item.sku}`,
		})
		item.imgUrl = request.data.image
		return item
	} else {
		return null
	}
	// return item
}

/**
 * Returns the product name
 * @param {string} url The url for the product
 * @param {boolean} short Whether to shorten the name or not
 * @returns {Promise<string>} Promise object represents the product name
 */
export async function getProdName(url: string, short = true) {
	const { data } = await axios.get(url)
	const $ = load(data)
	const prodName = $('h1').text()
	if (short) return shortenName(prodName)
	else return prodName
}
/**
 * Shortens the product name
 * @param {string} name The name of the product
 * @returns {string} The shortened name of the product
 */
function shortenName(name: string): string {
	const shortName = name.split(' ').slice(0, 4).join().replace(/,/g, ' ')
	return shortName
}

/**
 * Extracts the image url from the product page
 * @param raw_url The raw url of the product
 * @returns The url of the product image
 */
async function extractImgUrl(raw_url: string) {
	const base_url = 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/'
	// console.log('raw_url:', raw_url)
	const resp = await axios.get(raw_url)
	const $ = load(resp.data)
	const soldBy = $('.reviewsContainer_2ANi3')
		.next()
		.children()
		.first()
	const classList = soldBy.attr('class').split(/\s+/)
	let ext: string
	if (classList?.some((c) => c.startsWith('soldByBestBuy_'))) {
		ext = '.jpg'
	}
	else {
		ext = '.jpeg'
	}

	const sku = raw_url.split('/').pop()
	const first3 = sku.substring(0, 3)
	const first5 = sku.substring(0, 5)
	const imgUrl = `${base_url}${first3}/${first5}/${sku}${ext}`
	return imgUrl
}
/**
 * basic SKU validation, will fail for some SKUs
 * @todo: Update the validation to allow characters other than numbers
 * @param sku The sku to validate
 * @returns true if the sku is valid
 */
export function validateSKU(sku: string) {
	return sku.length === 8 && sku.match(/^[0-9]+$/)
}

function main() {
	extractImgUrl('https://www.bestbuy.ca/en-ca/product/15645757')
	// extractImgUrl('https://www.bestbuy.ca/en-ca/product/sony-playstation-5-console/14962185')
}

main()
// const testSkus = [
// 	'14575596',
// '14583636',
// '15317229',
// 	'15178453',
// 	'13444247',
// 	'15615205',
// 	'15317355',
// 	'15736356',
// ]
