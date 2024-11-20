const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/personController");

// router.post("/", Controllers.createPerson);

router.get("/", Controllers.getAllPerson);

module.exports = router;
