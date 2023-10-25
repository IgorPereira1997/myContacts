const { response } = require("express");
const ContactsRepository = require('../repositories/ContactsRepository');
class ContactContoller {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
    //response.send('Greetings from ContactController (index)!');
  }

  //Obter UM registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: "Contact not found"});
    }

    response.json(contact);
  }

  //Criar novo registro
  async store(request, response) {
    const { name, email, phone, category_id} = request.body;

    if(!name){
      return response.status(400).json({ error: "Name is required"});
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if(contactExists){
      return response.status(400).json({ error: "Email is already taken"});
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id
    });

    response.json(contact);

  }

  //Editar UM registro
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id} = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if(!contactExists){
      return response.status(404).json({ error: "Contact not found"});
    }

    if(!name){
      return response.status(400).json({ error: "Name is required"});
    }

    const emailTaken = await ContactsRepository.findByEmail(email);
    if(emailTaken && emailTaken.id !== id){
      return response.status(400).json({ error: "Email is in use"});
    }

    const contact = await ContactsRepository.update(id, {
        name, email, phone, category_id
    });

    response.json(contact);
  }

  //Deletar um registro
  async delete(request, response) {

    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: "Contact not found"});
    }

    await ContactsRepository.delete(id);
    // Status: No Content (204)
    response.sendStatus(204);

  }
}

// Singleton
module.exports = new ContactContoller();
