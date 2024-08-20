import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ProductService from './product.service';
import { AuthGuard } from 'src/security/auth.guard';
import { PermissionsGuard } from 'src/security/permission.guard';
import { Permissions } from 'src/security/permission.decorator';
import { permissionsList } from 'src/utils/consts/permissions.consts';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { User } from 'src/utils/entities/user.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('/products')
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(permissionsList.product.CREATE_PRODUCTS)
  @ApiOperation({ summary: 'Create product' })
  @Post()
  createProduct(@CurrentUser() user: User, @Body() data: CreateProductDTO) {
    return this.productService.createProduct({ ...data, userId: user.id });
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(permissionsList.product.UPDATE_PRODUCTS)
  @ApiOperation({ summary: 'Update product' })
  @Patch('/:productId')
  updateProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @CurrentUser() user: User,
    @Body() data: UpdateProductDTO,
  ) {
    return this.productService.updateProduct({
      ...data,
      userId: user.id,
      productId,
    });
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(permissionsList.product.GET_PRODUCTS)
  @ApiOperation({ summary: 'Get products' })
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(permissionsList.product.DELETE_PRODUCTS)
  @ApiOperation({ summary: 'Delete product' })
  @Delete('/:productId')
  deleteProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @CurrentUser() user: User,
  ) {
    return this.productService.deleteProducts({ userId: user.id, productId });
  }
}
