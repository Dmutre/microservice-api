import { DataSource, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { Logger } from '@nestjs/common';
import { rolePermissions } from './data/role-permission.consts';

export default class RolePermissionSeeder {
  private readonly logger = new Logger('RolePermissionSeeder');

  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    for (const roleName in rolePermissions) {
      const role = await roleRepository.findOneBy({ name: roleName });
      if (role) {
        const permissionsNames = rolePermissions[roleName];
        const permissions = await permissionRepository.findBy({
          name: In(permissionsNames),
        });

        role.permissions = permissions;
        await roleRepository.save(role);
        this.logger.log(`Permissions updated for role ${roleName}`);
      } else {
        this.logger.warn(`Role ${roleName} not found`);
      }
    }

    this.logger.log('Role permissions have been seeded');
  }
}
