export class UsersRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async findByUsername({ username }) {
    return await this.connection("users").where("username", username).first();
  }
}
