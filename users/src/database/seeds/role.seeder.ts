import { DataSource, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Logger } from '@nestjs/common';
import { rolesList } from './data/roles.consts';

export default class RoleSeeder {
  private readonly logger = new Logger('RoleSeeder');

  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const rolesNames = Object.keys(rolesList);
    const rolesDb = await roleRepository.find({
      where: {
        name: In(rolesNames),
      },
    });
    for (const role of rolesNames) {
      if (!rolesDb.find((roleDb) => roleDb.name === role)) {
        const newRole = await new Role();
        newRole.name = role;
        await roleRepository.save(newRole);
      }
    }
    this.logger.log('Roles have been seeded');
  }
}
