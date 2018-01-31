import { CompanyAddress } from './company-address';

export class Company {

  name: string;
  email: string;
  cnpj: string;
  phone: string;
  cpf_owner: string;
  address: CompanyAddress;

  constructor( ) {
    this.name = null;
    this.email = null;
    this.cnpj = null;
    this.phone = null;
    this.cpf_owner = null;
    this.address = new CompanyAddress();
  }

  public serialize(data: object) {
    for (const field of Object.keys(data)) {
      if (field === 'company_address') {
        this.setAddress(data[field]);
      } else if (field === 'users_companies') {
        this['users_companies_attributes'] = data[field];
      } else {
        this[field] = data[field];
      }
    }
  }

  private setAddress(addressObj) {
    this.address.serialize(addressObj);
  }

}
