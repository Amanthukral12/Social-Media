const express = require("express");
const { getPosts, createPost, postByUser } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);

router.get("/posts/by/:userId", requireSignin, postByUser);
router.param("userId", userById);

module.exports = router;