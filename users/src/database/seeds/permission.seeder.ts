import { DataSource } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { permissions } from './data/default-permissions';

export default class PermissionSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Permission);

    for (const permName of permissions) {
      const exist = await repository.findOneBy({ name: permName });

      if (!exist) {
        const newPermission = new Permission();
        newPermission.name = permName;
        await repository.save(newPermission);
      }
    }
  }
}
