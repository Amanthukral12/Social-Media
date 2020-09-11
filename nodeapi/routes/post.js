const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", getPosts);
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postByUser);
router.get("/post/:postId", singlePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.get("/post/photo/:postId", photo);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
