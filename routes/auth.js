const router = require("express").Router();
const authController = require("../controllers/auth");


router.get("/admin/login", authController.getLoginPage);
router.post("/admin/login", authController.postLogin);

router.get("/admin/register", authController.getRegisterPage);
router.post("/admin/register", authController.postRegister);

module.exports = router;
