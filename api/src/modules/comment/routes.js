const express = require("express")
const router = express.Router();
const commentController = require('./controller'); 

router.get("/", commentController.readComment);
router.get("/read/:id", commentController.readOneComment);
router.post("/create", commentController.creatComment);
router.put("/update/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteComment); 

module.exports = router;