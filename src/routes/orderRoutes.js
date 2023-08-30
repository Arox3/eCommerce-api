const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOrder);

router.delete("/", orderController.deleteOrder);

module.exports = router;
