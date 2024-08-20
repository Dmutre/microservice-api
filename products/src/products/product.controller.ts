import { Controller } from '@nestjs/common';
import { Productservice } from './product.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { GetProductsDTO } from './dto/get-products.dto';
import { ProductActionDTO } from './dto/product-action.dto';

@Controller()
export default class ProductController {
  constructor(private readonly productService: Productservice) {}

  @MessagePattern({ cmd: 'create_product' })
  createProduct(data: CreateProductDTO) {
    return this.productService.createProduct(data);
  }

  @MessagePattern({ cmd: 'update_product' })
  updateProduct(data: UpdateProductDTO) {
    return this.productService.updateProduct(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  getProducts(data: GetProductsDTO) {
    return this.productService.getProducts(data);
  }

  @MessagePattern({ cmd: 'delete_products' })
  deleteProducts(data: ProductActionDTO) {
    return this.productService.deleteProduct(data);
  }
}
