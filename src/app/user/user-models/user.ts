import { UserAddress } from './user-address';
import { UserInfo } from './user-info';

export class User {

  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_address_attributes: UserAddress;
  user_info_attributes: UserInfo;

  constructor( ) {
    this.name = null;
    this.lastname = null;
    this.email = null;
    this.password = null;
    this.password_confirmation = null;
    this.user_address_attributes = new UserAddress();
    this.user_info_attributes = new UserInfo();
  }

  public serialize(data: object) {
    for (const field of Object.keys(data)) {
      if (field === 'user_info') {
        this.setInfo(data[field]);
      } else if (field === 'user_address') {
        this.setAddress(data[field]);
      } else {
        this[field] = data[field];
      }
    }
  }

  private setAddress(address) {
    this.user_address_attributes.serialize(address);
  }

  private setInfo(info) {
    this.user_info_attributes.serialize(info);
  }
}
