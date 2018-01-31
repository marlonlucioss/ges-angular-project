export class UserInfo {

  cpf: string;
  rg: string;
  sex: string;
  date_birth: string;
  phone: string;
  marital_status: string;
  naturalness: string;

  constructor( ) {
    this.cpf = null;
    this.rg = null;
    this.sex = null;
    this.date_birth = null;
    this.phone = null;
    this.marital_status = null;
    this.naturalness = null;
  }

  public deserialize() {

  }

  public serialize(data) {
    for (const field of Object.keys(data)) {
      this[field] = data[field];
    }
  }
}
