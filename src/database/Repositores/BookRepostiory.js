export class BooksRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async find() {
    return await this.connection("books");
  }

  async findByID(id) {
    return await this.connection("books").where("id", id).first();
  }

  async create({ book_name, book_author, book_category, realase_year }) {
    return await this.connection("books").insert({
      book_name,
      book_author,
      book_category,
      //realase_year: new Date(Date.parse(realase_year)),
      realase_year: realase_year,
    });
  }

  async update({ id, book_name, book_author, book_category, realase_year }) {
    return await this.connection("books").where("id", id).update({
      book_name,
      book_author,
      book_category,
      //realase_year: new Date(Date.parse(realase_year)),
      realase_year: realase_year,
    });
  }

  async delete(id) {
    await this.connection("books").where("id", id).delete();
  }
}
