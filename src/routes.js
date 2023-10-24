const { Router } = require('express');

const ContactContoller = require('./app/controllers/ContactController');

const router = Router();

router.get('/contacts', ContactContoller.index);
router.get('/contacts/:id', ContactContoller.show);
router.delete('/contacts/:id', ContactContoller.delete);

module.exports = router;
