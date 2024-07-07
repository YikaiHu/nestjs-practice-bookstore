import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressValidationPipe implements PipeTransform<AddressDto> {
  statePostCodeMap: Record<string, string> = {
    NSW: '2',
    ACT: '2',
    VIC: '3',
    QLD: '4',
    SA: '5',
    WA: '6',
    TAS: '7',
    NT: '0',
  };

  async transform(value: AddressDto, metadata: ArgumentMetadata) {
    if (!this.statePostCodeMap[value.state.toUpperCase()]) {
      throw new BadRequestException('Incorrect State Code');
    }
    if (
      this.statePostCodeMap[value.state.toUpperCase()].substring(0, 1) !==
      value.postCode.toString().substring(0, 1)
    ) {
      throw new BadRequestException(
        `The postcode ${value.postCode} does not match with state: ${value.state}`,
      );
    }
    return value;
  }
}
