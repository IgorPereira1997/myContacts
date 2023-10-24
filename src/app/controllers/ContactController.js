const { response } = require("express");

class ContactContoller {
  // Listar todos os registros
  index(request, response) {
    response.send('Greetings from ContactController (index)!');
  }

  //Obter UM registro
  show() {

  }

  //Criar novo registro
  store() {

  }

  //Editar UM registro
  update() {

  }

  //Deletar um registro
  delete() {

  }
}

// Singleton
module.exports = new ContactContoller();
