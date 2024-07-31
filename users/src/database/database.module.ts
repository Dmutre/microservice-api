import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConfigurationModule from 'src/config/configuration.module';
import DatabaseConfig from 'src/config/database.config';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [DatabaseConfig],
      useFactory: (configService: DatabaseConfig) => ({
        type: 'postgres',
        host: configService.db_host,
        port: configService.db_port,
        username: configService.db_user,
        password: configService.db_password,
        database: configService.db_name,
        entities: [User, Token, Permission, Role],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export default class DatabaseModule {}
