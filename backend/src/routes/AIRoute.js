const express = require("express");
const {getReview } = require("../controllers/AIcontroller")
const router = express.Router();

router.post("/getPromt",getReview)



module.exports = router
