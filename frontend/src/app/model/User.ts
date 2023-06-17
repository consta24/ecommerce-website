export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}
