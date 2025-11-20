const { Router } = require("express");
const router = Router();

const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.get("/:id", userController.getSingleUser)

router.get("/:id/posts", userController.listPostsByUser); //All the posts from the users :id

router.post("/", userController.createUser)

router.put("/:id", userController.updateUser)

router.delete("/:id", userController.deleteUser)

module.exports = router;
