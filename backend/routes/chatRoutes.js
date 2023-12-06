const express = require('express');
const router = express.Router();
const chatController = require ("../controllers/chatController");
const authController = require ("../controllers/authController");


router.get("/getChats/:id",chatController.getChats);


module.exports = router;