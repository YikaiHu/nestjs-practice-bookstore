import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.dto';

interface AddressDto {
  id: number;
  addressLine: string;
  postCode: number;
  state: string;
  createdDate: Date;
}

@Injectable()
export class AddressStoreService {
  private addressDataStore: AddressDto[] = [
    {
      id: 1,
      addressLine: '123 Queen street',
      postCode: 4000,
      state: 'QLD',
      createdDate: new Date(),
    },
  ];

  async get(id: number): Promise<AddressDto> {
    return new Promise((resolve) => {
      const result = this.addressDataStore.find((t) => {
        return t.id === id;
      });
      resolve(result);
    });
  }

  async getAll(): Promise<AddressDto[]> {
    return new Promise((resolve) => {
      resolve(this.addressDataStore);
    });
  }

  async create(address: CreateAddressDto): Promise<void> {
    const id =
      this.addressDataStore.length === 0
        ? 0
        : Math.max(...this.addressDataStore.map((t) => t.id));
    const newAddress = {
      ...address,
      id: id + 1,
      createdDate: new Date(),
    } as AddressDto;

    return new Promise((resolve) => {
      this.addressDataStore.push(newAddress);
      resolve();
    });
  }
  async update(id: number, address: AddressDto): Promise<void> {
    return new Promise((resolve) => {
      const index = this.addressDataStore.findIndex((x) => x.id === id);
      this.addressDataStore[index] = address;
      resolve();
    });
  }

  async delete(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.addressDataStore = this.addressDataStore.filter((t) => t.id !== id);
      resolve();
    });
  }
}
