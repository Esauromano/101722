const express = require("express")
const router = express.Router();
const commentsController = require('./controller'); 

router.get("/", commentsController.readComments);
router.get("/read/:id", commentsController.readOneComments);
router.post("/create", commentsController.creatComments);
router.put("/update/:id", commentsController.updateComments);
router.delete("/delete/:id", commentsController.deleteComments); 

module.exports = router;