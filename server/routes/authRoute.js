const { Router } = require("express");
const router = Router();

const authController = require("../controllers/authController");

router.post('/auth/register', authController.register); //Ok
router.post('/auth/login', authController.login); //Ok
router.get('/auth/me', authController.loginSuccess); //Ok

module.exports = router;
