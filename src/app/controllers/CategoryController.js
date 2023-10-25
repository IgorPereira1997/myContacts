const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await CategoriesRepository.findAll(orderBy);

    response.json(contacts);
    // response.send('OK - index');
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'Name is already taken' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.json(category);
    // response.send('OK - store');
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
    // response.send('OK - show');
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.update(
      id,
      { name },
    );

    return response.json(category);
    // response.send('OK - update');
  }

  // CASO do DELETE se estiver em uso
  async delete(request, response) {
    const { id } = request.params;
    const result = await CategoriesRepository.delete(id);

    if (result) {
      return response.status(403).json(result);
    }
    // Status: No Content (204)
    return response.sendStatus(204);
    // response.send('OK - Delete');
  }
}

module.exports = new CategoryController();
