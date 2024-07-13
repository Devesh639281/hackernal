const express = require("express");
const router = express.Router();
const {
  createProductController,
  getProductController,
  getsingleProductController,
  deleteProductController,
  updateProductController,
  searchProductController,
} = require("../controller/productController");
const { requireSignin } = require("../middleware/authenticationMiddleware");

router.post("/create-product", requireSignin, createProductController);

router.put("/update-product/:_id", requireSignin, updateProductController);

router.get("/get-product", getProductController);

router.get("/single-product/:_id", getsingleProductController);

router.delete("/delete-product/:_id", deleteProductController);

router.get("/search", searchProductController);

module.exports = router;
