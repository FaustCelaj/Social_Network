const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:userId/friends").post(addFriend);

router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
