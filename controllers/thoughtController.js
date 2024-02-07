const Thought = require("../models/thoughts");
const User = require("../models/users");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      return res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      return res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
