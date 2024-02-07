const router = require("express").Router();

const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
