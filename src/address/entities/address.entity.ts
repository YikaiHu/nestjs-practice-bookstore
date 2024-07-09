import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'NA'})
  address_line: string;

  @Column()
  post_code: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_date: Date;

  @CreateDateColumn()
  updated_date: Date;
}
