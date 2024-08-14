import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

export default class RoleSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    let adminRole = await roleRepository.findOne({
      where: { name: 'Admin' },
      relations: ['permissions'],
    });

    if (!adminRole) {
      adminRole = new Role();
      adminRole.name = 'Admin';
      adminRole.permissions = [];
      await roleRepository.save(adminRole);
    }

    const permissions = await permissionRepository.find();

    const newPermissions = permissions.filter(permission => !adminRole.permissions.some(p => p.id === permission.id));

    if (newPermissions.length > 0) {
      adminRole.permissions = [...adminRole.permissions, ...newPermissions];
      await roleRepository.save(adminRole);
    }
  }
}
