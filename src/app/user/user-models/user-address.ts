export class UserAddress {

  state_id: number;
  city_id: number;
  postal_code: string;
  neighborhood: string;
  number: string;
  complement: string;
  street: string;

  constructor( ) {
    this.state_id = null;
    this.city_id = null;
    this.postal_code = null;
    this.neighborhood = null;
    this.number = null;
    this.complement = null;
    this.street = null;
  }

  public deserialize() {

  }

  public serialize(data) {
    for (const field of Object.keys(data)) {
      this[field] = data[field];
    }
  }
}

