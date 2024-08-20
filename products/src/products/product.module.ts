import { Module } from '@nestjs/common';
import ProductController from './product.controller';
import { Productservice } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [Productservice],
  imports: [TypeOrmModule.forFeature([Product])],
})
export default class ProductModule {}
