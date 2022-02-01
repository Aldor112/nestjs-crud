import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product} from './interfaces/product.interface';
import {CreateProductDTO} from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    ){}
    
   async getProducts(page?:any, limit?:any): Promise<Product[]> {
     //const products = await this.productModel.find();
      limit = parseInt(limit);
      page = parseInt(page);
     const products = await this.productModel.find()//paginador
     .limit(limit * 1)
     .skip((page - 1) * limit)
     .exec();

     return products;
    }

    async countTotal(){//cuenta de los items en la pase de datos
      const count = await this.productModel.countDocuments();
      return count;
    }

    async getProduct(productId: string): Promise<Product>{
     const product = await this.productModel.findById(productId);
     return product;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
      const product =  new this.productModel(createProductDTO);
      return await product.save();
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product>{
      const updatedProduct = await this.productModel.findByIdAndUpdate(productId,createProductDTO, {new: true});
      return updatedProduct;
    }

    async deleteProduct(productID: string): Promise<Product>{

      return await this.productModel.findByIdAndDelete(productID);

    }
}

