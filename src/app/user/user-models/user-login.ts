export class UserLogin {

  public email: string;
  public password: string;

  constructor() {}

  public serialize(data: object) {
    for (const field of Object.keys(data)) {
      this[field] = data[field];
    }
  }

}
