const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  hasAuthorization,
} = require("../controllers/user");
const { postById } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
router.param("userId", userById);
router.param("postId", postById);
router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);
router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.get("/user/photo/:userId", userPhoto);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);

router.get("/user/findpeople/:userId", requireSignin, findPeople);

module.exports = router;
