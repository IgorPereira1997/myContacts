const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES ($1)
    RETURNING *;
    `, [name]);
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
    UPDATE categories
    SET
      name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id]);
    return row;
  }

  // Tratar caso de ID estar sendo utilizado
  async delete(id) {
    const [hasAssociatedContacts] = await db.query(`
    SELECT COUNT(*)
    FROM contacts
    WHERE category_id = $1
    `, [id]);
    const contactCount = Number(hasAssociatedContacts.count);
    if (contactCount > 0) {
    // Categoria possui contatos associados, então não é possível excluir
      return { error: 'Category is being used' };
    }
    const deleteOp = await db.query(`
    DELETE FROM categories WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new CategoryRepository();
