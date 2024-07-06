import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';

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

  //Retrieve an address by its unique id
  getById(id: number) {
    return this.addressDataStore.find(t => t.id === id);
  }

  getAll() {
    return this.addressDataStore;
  }
}
