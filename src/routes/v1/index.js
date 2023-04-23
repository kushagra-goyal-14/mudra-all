const express = require("express");
const router = express.Router();
const {
  userController,
  transactionController,
} = require("../../controllers/index");
const { AuthMiddlewares } = require("../../middlewares/index");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/home", AuthMiddlewares.isAuthenticated, (req, res) => {
  return res.status(200).json({ message: "ok" });
});
router.post(
  "/create",
  AuthMiddlewares.isAuthenticated,
  transactionController.create
);
router.get(
  "/transactions",
  AuthMiddlewares.isAuthenticated,
  transactionController.get
);
router.get(
  "/transactions-all",
  AuthMiddlewares.isAuthenticated,
  transactionController.getAll
);
router.post(
  "/filter",
  AuthMiddlewares.isAuthenticated,
  transactionController.filterBydate
);
router.post(
  "/find-category",
  AuthMiddlewares.isAuthenticated,
  transactionController.findbycategory
);
router.post(
  "/predict",
  AuthMiddlewares.isAuthenticated,
  transactionController.custom
);
module.exports = router;
