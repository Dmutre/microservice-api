import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import PermissionSeeder from './permission.seeder';
import RoleSeeder from './role.seeder';
import RolePermissionSeeder from './role-permission.seeder';

@Injectable()
export default class SeederService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const seeders = [
      new PermissionSeeder().run(this.dataSource),
      new RoleSeeder().run(this.dataSource),
      new RolePermissionSeeder().run(this.dataSource),
    ];
    await Promise.all(seeders);
  }
}
