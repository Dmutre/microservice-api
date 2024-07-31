import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum TokenType {
  EMAIL_VERIFICATION_TOKEN = 'EMAIL_VERIFICATION_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  CHANGE_PASSWORD_TOKEN = 'CHANGE_PASSWORD_TOKEN',
}

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TokenType, nullable: false })
  type: TokenType;

  @Column({ type: 'text', nullable: false })
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
