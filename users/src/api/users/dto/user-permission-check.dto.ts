import { IsArray, IsString } from 'class-validator';

export class UserPermissionCheckDTO {
  @IsString()
  userId: string;

  @IsString({ each: true })
  @IsArray()
  permissions: string[];
}
