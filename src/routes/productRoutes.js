const express = require("express");
const router = express.Router();
const Controller = require("../controllers/productController");

router.post("/", Controller.createProduct);

router.get("/", Controller.getAllProduct);
router.get("/:id", Controller.getProduct);

// router.put("/", Controller.updateProduct);

// router.delete("/", Controller.deleteProduct);

module.exports = router;
