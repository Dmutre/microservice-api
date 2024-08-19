import { DataSource } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { permissionsList } from './data/permissions.consts';
import { Logger } from '@nestjs/common';

export default class PermissionSeeder {
  private readonly logger = new Logger('PermissionSeeder');

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Permission);

    for (const permCategory of Object.keys(permissionsList)) {
      for (const permName of Object.keys(permissionsList[permCategory])) {
        const exist = await repository.findOneBy({
          name: permName,
        });

        if (!exist) {
          const newPermission = new Permission();
          newPermission.name = permName;
          await repository.save(newPermission);
        }
      }
    }
    this.logger.log('All permissions have been seeded');
  }
}
