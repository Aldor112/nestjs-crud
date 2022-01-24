import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service'
@Controller('product')
export class ProductController {

    constructor(private productSvc: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
      const response = await this.productSvc.createProduct(createProductDTO);
      return  res.status(HttpStatus.OK).json({
            message: 'Product created',
            data: response
        })
    }

    @Get('/')
    async getProducts(@Res() res){
       let response = await this.productSvc.getProducts();

       return res.status(HttpStatus.OK).json({
        products: response
       })
    }

    @Get('/:id')
    async getProduct(@Res()res, @Param('id')productId){

        const product = await this.productSvc.getProduct(productId);
        if(!product){
            throw new NotFoundException('product not found');
        }
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId')productId){
       const product = await this.productSvc.deleteProduct(productId);
       if(!product){
        throw new NotFoundException('product not found');
        }

        return res.status(HttpStatus.OK).json({
            message: 'product deleted',
            product
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productId')productId){
        const product = await this.productSvc.updateProduct(productId, createProductDTO);
        if(!product){
            throw new NotFoundException('product not found');
        }

        return res.status(HttpStatus.OK).json({
            message: 'product updated',
            product
        })
    }
}
