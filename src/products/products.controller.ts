import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './models/product';
import { ProductRequest } from './models/product-request';
import { ProductResponse } from './models/product-response';

@Controller('api/products')
export class ProductsController {

    /**
     *Creates an instance of ProductsController.
     * @memberof ProductsController
     */
    constructor(private readonly _productService: ProductService) { }

    @Post()
    async addProduct(@Body() requestBody: ProductRequest): Promise<ProductResponse> {
        return await this._productService.insertProduct(requestBody);
    }

    @Get()
    async getAllProducts(): Promise<ProductResponse> {
        return await this._productService.fetchAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') productId: string): Promise<ProductResponse> {
        return await this._productService.fetchSingleProduct(productId);
    }

    @Put(':id')
    async updateProduct(@Body() productReq: ProductRequest,
        @Param('id') productId: string): Promise<ProductResponse> {
        return await this._productService.updateProduct(productId, productReq);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string): Promise<ProductResponse> {
        return await this._productService.deleteProduct(productId);
    }
}
