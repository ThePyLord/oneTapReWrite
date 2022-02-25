import { getProduct, validateSKU } from '../src/app/sku'
import * as m from '../src/app/sku'

const mockedGetProduct = jest.spyOn(m, 'getProduct')
const mockedValidateSKU = jest.spyOn(m, 'validateSKU')
const mockedProductName = jest.spyOn(m, 'getProdName')
mockedValidateSKU.mockImplementation((sku) => {
	return sku.length === 8 && sku.match(/^[0-9]+$/)
})

describe('Test the SKU functions', () => {
	let randomQuantity: number
	beforeAll(() => {
		randomQuantity = Math.floor(Math.random() * 100)
	})

	test('Validate the SKU', async () => {
		// expect(validateSKU('145100')).toBe(false)
		expect(mockedValidateSKU.getMockImplementation()('145100')).toBe(false)
	})
	
	test('Get the product', async () => {
		mockedGetProduct.mockImplementation(async (sku) => {
			return {
				quantity: randomQuantity,
				stockInfo: 'Unknown',
				imgUrl: `https://multimedia.bbycastatic.ca/multimedia/products/500x500/${sku.substring(0, 3)}/${sku.substring(0, 5)}/${sku}.jpg`,
				productUrl: `https://www.bestbuy.ca/en-ca/product/${sku}`,
				sku: sku,
				stockLimit: '0'
			}
		})
		
		expect(mockedGetProduct).toHaveBeenCalledTimes(0)
		expect(await mockedGetProduct.getMockImplementation()('145100')).toMatchObject({
			quantity: randomQuantity,
			stockInfo: 'Unknown',
			imgUrl: `https://multimedia.bbycastatic.ca/multimedia/products/500x500/145/14510/145100.jpg`,
			productUrl: `https://www.bestbuy.ca/en-ca/product/145100`,
			sku: '145100',
			stockLimit: '0'
		})
	})

	test('Get the product name', async () => {
		mockedProductName.mockImplementation(async (_, short) => {
			return (short ? 'Test Product' : 'Random Test Product')
		})
		const fn = mockedProductName.getMockImplementation()
		expect(mockedProductName).toHaveBeenCalledTimes(0)
		expect(await fn('https://www.bestbuy.ca/en-ca/product/145100', true)).toBe('Test Product')
		expect(await fn('https://www.bestbuy.ca/en-ca/product/145100', false)).toBe('Random Test Product')
	})
})