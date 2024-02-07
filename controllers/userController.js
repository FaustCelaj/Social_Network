const mongoose = require("mongoose");
const Thought = require("../models/thoughts");
const User = require("../models/users");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing user
  async updateUser(req, res) {
    try {
      const user = await User.updateOne({ _id: req.params.userId }, req.body);

      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      return res.json({ message: "User updated successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete an existing user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User is not found" });
      }
      return res.json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;

      if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: "Invalid friendId." });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: "Invalid friendId." });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user found." });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
