import { Injectable } from '@nestjs/common';
import { AddressDto } from './address-dto';

@Injectable()
export class AddressService {
  private addressDataStore: AddressDto[] = [
    {
      id: 1,
      addressLine: '123 Queen street',
      postCode: 4000,
      state: 'QLD',
      createdDate: new Date(),
    },
  ];

  getById(id: number) {
    return this.addressDataStore.find((t) => t.id === id);
  }
}
