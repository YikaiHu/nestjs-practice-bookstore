import { Injectable } from '@nestjs/common';
import { AddressDto, CreateAddressDto } from './dto/address.dto';
import { AddressStoreService } from './address-store.service';

@Injectable()
export class AddressService {
  constructor(private readonly addressStoreService: AddressStoreService) {}

  async getById(id: number): Promise<AddressDto> {
    return await this.addressStoreService.get(id);
  }

  async getAll(): Promise<AddressDto[]> {
    return await this.addressStoreService.getAll();
  }

  async create(address: CreateAddressDto): Promise<void> {
    return await this.addressStoreService.create(address);
  }

  async update(id: number, address: AddressDto): Promise<void> {
    return await this.addressStoreService.update(id, address);
  }

  async delete(id: number): Promise<void> {
    return await this.addressStoreService.delete(id);
  }
}
