const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const middleware = require('./middleware/auth');

const loginController = require('./controllers/login.controller');
const registerController = require('./controllers/register.controller');
const homeController = require('./controllers/home.controller');


router.post('/login', loginController.login);
router.post('/register', registerController.store);

router.get('/home', middleware.auth, homeController.index);


module.exports = router;