const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoriesController = require('./app/controllers/CategoryController');

const router = Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoriesController.index);
router.get('/categories/:id', CategoriesController.show);
router.delete('/categories/:id', CategoriesController.delete);
router.post('/categories', CategoriesController.store);
router.put('/categories/:id', CategoriesController.update);

module.exports = router;
