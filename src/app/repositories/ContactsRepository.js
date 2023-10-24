const { v4 } = require('uuid');

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
  delete(id){
    return new Promise((resolve, reject) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

//Singleton
module.exports = new ContactsRepository();
