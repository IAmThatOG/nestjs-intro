import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Product } from './models/product';
import { ProductRequest } from './models/product-request';
import { ProductResponse } from './models/product-response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

    /**
     *Creates an instance of ProductsService.
     * @memberof ProductsService
     */
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }


    /**
     *handles the creation of a new product
     *
     * @param {ProductRequest} productRequest
     * @returns {ProductResponse} ProductResponse
     * @memberof ProductsService
     */
    async insertProduct(productRequest: ProductRequest): Promise<ProductResponse> {
        const title = productRequest.title;
        const price = productRequest.price;
        const description = productRequest.description;

        const newProduct = new this.productModel({
            title,
            description,
            price
        });
        let createdTeam;
        try {
            createdTeam = await newProduct.save();
        } catch (error) {
            console.log('Error ==> ', error);
            throw new InternalServerErrorException()
        }

        const productRes: ProductResponse = new ProductResponse("00", "Success", createdTeam);
        return productRes;
    }

    async fetchAllProducts(): Promise<ProductResponse> {
        let products;
        try {
            products = await this.productModel.find({}, '-__v').exec();
        } catch (error) {
            throw new InternalServerErrorException();
        }
        return new ProductResponse("00", "success", products);
        // return new ProductResponse("00", "success", [...this._products]);
    }

    async findProductById(id: string): Promise<Product> {
        // const product = this._products.find((product) => product.id === id);
        const product = await this.productModel.findById(id, '-__v').exec();
        console.log('Product ==> ', product);
        if (!product) {
            throw new NotFoundException("could not find product");
        }
        // return { ...product }
        return product;
    }

    async fetchSingleProduct(productId: string): Promise<ProductResponse> {
        const product = await this.findProductById(productId);
        return new ProductResponse("00", "success", product);
    }

    async updateProduct(productId: string, productReq: ProductRequest): Promise<ProductResponse> {
        try {
            await this.productModel.findByIdAndUpdate(productId, productReq).exec();
        } catch (error) {
            console.log('Error ==> ', error);
            throw new InternalServerErrorException();
        }
        return new ProductResponse("00", "success", {});
    }

    async deleteProduct(productId: string): Promise<ProductResponse> {
        let result = await this.productModel.findByIdAndDelete(productId).exec();
        if (!result) {
            throw new NotFoundException();
        }
        // const product = this.findProductById(productId);
        // this._products.splice(+product.id - 1, 1);
        return new ProductResponse('00', 'success', {});
    }
}
