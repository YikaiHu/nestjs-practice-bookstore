import { AddressEntity, ContactEntity } from 'src/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  user_name: string;

  @Column()
  @Expose()
  email: string;

  @OneToOne(() => AddressEntity, (address) => address.user, { eager: true })
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  contacts: ContactEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  roles: RoleEntity[];

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @Column()
  @Exclude({toPlainOnly: true})
  password: string;
}
