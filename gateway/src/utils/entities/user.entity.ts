import { Role } from './role.entity';

export enum EmailState {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

export class User {
  id: string;
  username: string;
  email: string;
  emailState: EmailState;
  password: string;
  avatar?: Buffer;
  roles?: Role[];
  createdAt: Date;
  updatedAt: Date;
}
