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
import { RoleConstant } from '../role.constant';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
  id: number;

  @Column()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
  user_name: string;

  @Column()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
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
  @Expose({ groups: [RoleConstant.Admin]})
  password: string;

  @Column()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor]})
  pay_grade: string;
}
