import { AddressEntity, ContactEntity } from 'src/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

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
}
