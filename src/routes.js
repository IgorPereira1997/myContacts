const { Router } = require('express');

const ContactContoller = require('./app/controllers/ContactController');

const router = Router();

router.get('/contacts', ContactContoller.index);

module.exports = router;
