const { response } = require("express");
const ContactsRepository = require('../repositories/ContactsRepository');
class ContactContoller {
  // Listar todos os registros
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
    //response.send('Greetings from ContactController (index)!');
  }

  //Obter UM registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: "User not found"});
    }

    response.json(contact);
  }

  //Criar novo registro
  store() {

  }

  //Editar UM registro
  update() {

  }

  //Deletar um registro
  async delete(request, response) {

    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: "User not found"});
    }

    await ContactsRepository.delete(id);
    // Status: No Content (204)
    response.sendStatus(204);

  }
}

// Singleton
module.exports = new ContactContoller();
