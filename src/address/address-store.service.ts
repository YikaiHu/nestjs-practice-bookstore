import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { DeleteResult, Repository } from 'typeorm';
import { DuplicateAddressException } from './duplicate-address-exception';

interface AddressDto {
  id: number;
  addressLine: string;
  postCode: number;
  state: string;
  createdDate: Date;
}

@Injectable()
export class AddressStoreService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}
  async get(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: {
        id,
      },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async getAll(): Promise<AddressEntity[]> {
    const result = this.addressRepository.find({});
    return result;
  }

  async create(address: CreateAddressDto): Promise<AddressEntity> {
    const existingAddress = await this.addressRepository.findOne({
      where: { address_line: address.addressLine },
    });

    if (existingAddress) {
      throw new DuplicateAddressException(address.addressLine);
    }

    const entity = new AddressEntity();
    entity.address_line = address.addressLine;
    entity.post_code = address.postCode.toString();
    entity.state = address.state;

    return await this.addressRepository.save(entity);
  }
  async update(id: number, address: AddressDto): Promise<AddressEntity> {
    const existingEntity = await this.addressRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingEntity) {
      throw new HttpException('Incorrect address id', HttpStatus.BAD_REQUEST);
    }
    existingEntity.address_line = address.addressLine;
    existingEntity.post_code = address.postCode.toString();
    existingEntity.state = address.state;
    return await this.addressRepository.save(existingEntity);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.addressRepository.delete({ id });
  }

  async getByAddressLine(addressLine: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({
      where: {
        address_line: addressLine,
      },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }
}
