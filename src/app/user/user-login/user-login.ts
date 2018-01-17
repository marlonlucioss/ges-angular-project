export class UserLogin {

  private email: string;
  private password: string;

  constructor( email, password ) {
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  setEmail(newEmail) {
    this.email = newEmail;
  }

  setPassword(newPassword) {
    this.email = newPassword;
  }

}
