const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register_user);
router.post("/login", userController.login_user);

module.exports = router;
