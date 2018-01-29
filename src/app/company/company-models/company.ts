import { CompanyAddress } from './company-address';

export class Company {

  name: string;
  email: string;
  cnpj: string;
  phone: string;
  address: CompanyAddress;

  constructor( ) {
    this.name = null;
    this.email = null;
    this.cnpj = null;
    this.phone = null;
    this.address = new CompanyAddress();
  }

  public serialize(data: object) {
    for (const field of Object.keys(data)) {
      if (field === 'company_address_attributes') {
        this.setAddress(data[field]);
      }
      this[field] = data[field];
    }
  }

  private setAddress(addressObj) {
    this.address.serialize(addressObj);
  }

}
