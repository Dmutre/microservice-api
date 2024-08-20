import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/utils/consts/services.consts';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductMessagePattern } from 'src/utils/consts/services-message-pattern.consts';
import { UpdateProductDTO } from './dto/update-product.dto';
import { GetProductsDTO } from './dto/get-products.dto';
import { ProductActionDTO } from './dto/product-action.dto';

@Injectable()
export default class ProductService {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  createProduct(data: CreateProductDTO) {
    return this.productClient.send(ProductMessagePattern.CREATE_PRODUCT, data);
  }

  updateProduct(data: UpdateProductDTO) {
    return this.productClient.send(ProductMessagePattern.UPDATE_PRODUCT, data);
  }

  getProducts(data?: GetProductsDTO) {
    return this.productClient.send(
      ProductMessagePattern.GET_PRODUCTS,
      data ? data : {},
    );
  }

  deleteProducts(data: ProductActionDTO) {
    return this.productClient.send(ProductMessagePattern.DELETE_PRODUCT, data);
  }
}
