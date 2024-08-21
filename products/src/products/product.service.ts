import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../database/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { GetProductsDTO } from './dto/get-products.dto';
import { MicroserviceException } from '../utils/exceptions/microservice.exception';
import { ProductActionDTO } from './dto/product-action.dto';

@Injectable()
export class Productservice {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createProduct(data: CreateProductDTO) {
    const product = this.productRepo.create(data);
    return await this.productRepo.save(product);
  }

  async updateProduct(data: UpdateProductDTO) {
    await this.checkOwnership(data.userId, data.productId);
    const { productId, ...updateData } = data;
    await this.productRepo.update({ id: productId }, updateData);
    return { message: 'Product updated successfuly' };
  }

  async getProducts(data: GetProductsDTO) {
    return await this.productRepo.find({
      where: {
        userId: data.userId,
      },
    });
  }

  private async checkOwnership(userId: string, productId: string) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (product.userId !== userId)
      throw new MicroserviceException(
        'Forbidden to perform this cation',
        HttpStatus.FORBIDDEN,
      );
  }

  async deleteProduct(data: ProductActionDTO) {
    await this.checkOwnership(data.userId, data.productId);
    await this.productRepo.delete({ id: data.productId });
    return { message: 'Product deleted' };
  }
}
