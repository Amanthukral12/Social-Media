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
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.get("/post/photo/:postId", photo);
router.param("userId", userById);
router.param("postId", postById);

module.exports = router;

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNhZTM2Njc2MmIyNTA1ZjhiZmU1ZDciLCJpYXQiOjE1OTc2OTQ4NTF9.eknkA2rWKQF0PMFKCPibisjeO8O10iP7XHgM_tPF_7Q
5f3ae366762b2505f8bfe5d7
5f3ae4b8762b2505f8bfe5d8 */
