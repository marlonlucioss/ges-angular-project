export class UserAddress {

  state_id: number;
  city_id: number;
  postal_code: string;
  neighborhood: string;
  number: string;
  complement: string;

  constructor( ) {
    this.state_id = null;
    this.city_id = null;
    this.postal_code = null;
    this.neighborhood = null;
    this.number = null;
    this.complement = null;
  }

  public deserialize() {

  }

  public serialize() {

  }
}

