const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Igor',
    email: "igor@teste.com",
    phone: '1234567890',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Luiz',
    email: "luiz@teste.com",
    phone: '0987654321',
    category_id: v4(),
  },
];

class ContactsRepository{
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts);
    });
  }
  findById(id){
    return new Promise((resolve, reject) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }
  findByEmail(email){
    return new Promise((resolve, reject) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }
  async create({ name, email, phone, category_id}){
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES ($1, $2, $3, $4) RETURNING *;
    `, [name, email, phone, category_id]);

    return row;
    // return new Promise((resolve, reject) => {
    //   const newContact = {
    //     id: v4(),
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     category_id: category_id
    //   };
    //   contacts.push(newContact);
    //   resolve(newContact);
    // });
  }
  update(id, { name, email, phone, category_id }){
    return new Promise((resolve, reject) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
  delete(id){
    return new Promise((resolve, reject) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

//Singleton
module.exports = new ContactsRepository();
