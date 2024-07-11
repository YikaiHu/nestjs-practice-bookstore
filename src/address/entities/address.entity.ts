import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'NA' })
  address_line: string;

  @Column()
  post_code: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_date: Date;

  @CreateDateColumn()
  updated_date: Date;

  @OneToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;
}

@Entity('contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => UserEntity, (user) => user.contacts)
  user: UserEntity;
}
