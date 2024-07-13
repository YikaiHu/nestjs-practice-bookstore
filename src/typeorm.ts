import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import {
  AddressEntity,
  ContactEntity,
} from './address/entities/address.entity';
import { RoleEntity } from './user/entities/role.entity';
import { UserEntity } from './user/entities/user.entity';
import { registerAs } from '@nestjs/config';
import { InitDatabase1720714397004 } from './migrations/1720714397004-InitDatabase';
import { AddUserCreatUpdatedDate1720714553167 } from './migrations/1720714553167-Add_User_creatUpdatedDate';
import { AddUserPassword1720866147138 } from './migrations/1720866147138-Add_User_password';
import { AddUserEmail1720867293406 } from './migrations/1720867293406-Add_User_Email';

dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

const config = {
  type: 'mysql',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  autoLoadEntities: true,
  synchronize: `${process.env.SYNCHRONIZE}` === 'true',
};

const { autoLoadEntities, synchronize, ...otherConfigs } = config;
const migrationConfig = {
  ...otherConfigs,
  migrations: [
    InitDatabase1720714397004,
    AddUserCreatUpdatedDate1720714553167,
    AddUserPassword1720866147138,
    AddUserEmail1720867293406,
  ],
  entities: [AddressEntity, UserEntity, ContactEntity, RoleEntity],
};
export default registerAs('OrmConfig', () => config);
export const connectionSource = new DataSource(
  migrationConfig as DataSourceOptions,
);
