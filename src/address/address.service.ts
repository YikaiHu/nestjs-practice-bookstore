import { Injectable } from '@nestjs/common';
import { AddressDto, CreateAddressDto } from './dto/address.dto';
import { AddressStoreService } from './address-store.service';
import { AddressEntity } from './entities/address.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(private readonly addressStoreService: AddressStoreService) {}

  async getById(id: number): Promise<AddressEntity> {
    return await this.addressStoreService.get(id);
  }

  async getAll(): Promise<AddressEntity[]> {
    return await this.addressStoreService.getAll();
  }

  async create(address: CreateAddressDto): Promise<AddressEntity> {
    return await this.addressStoreService.create(address);
  }

  async update(id: number, address: AddressDto): Promise<AddressEntity> {
    return await this.addressStoreService.update(id, address);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.addressStoreService.delete(id);
  }

  async getByAddressLine(addressLine: string): Promise<AddressEntity> {
    return await this.addressStoreService.getByAddressLine(addressLine);
  }
}
