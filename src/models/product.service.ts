import { shapeIntMongooseObjectId } from "../controllers/libs/config"
import Errors, { HttpCode, Message } from '../controllers/libs/Errors'
import {
	Product,
	ProductInput,
	ProductUpdateInput,
} from '../controllers/libs/types/product'
import ProductModel from '../schema/product.model'

class ProductService {
	private readonly productModel

	constructor() {
		this.productModel = ProductModel
	}
	/* SPA */

	/* SSR */
	public async getAllProducts(): Promise<Product[]> {
		const result = await this.productModel.find().exec()
		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)

		return result as Product[]
	}

	public async createNewProduct(input: ProductInput): Promise<Product> {
		try {
			return (await this.productModel.create(input)) as Product
		} catch (err) {
			console.error('Error, model: createNewProduct', err)
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
		}
	}

	public async updateChosenProduct(
		id: string,
		input: ProductUpdateInput,
	): Promise<Product> {
		id = shapeIntMongooseObjectId(id)
		const result = await this.productModel
			.findOneAndUpdate({ _id: id }, input, { new: true })
			.exec()
		if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
		console.log('result:', result)
		return result as Product
	}
}

export default ProductService