const { Thought } = require('../models');
const { obj } = require('../models/Reaction');
const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      if(!ObjectId.isValid(req.params.userId)){
        return res.status(404).json({
          message: 'ID is invalid!',
        });
      }
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const u = await User.findOne({ username: req.body.username });
      const e = await User.findOne({ email: req.body.email });
      if(u || e){
        return res.status(404).json({ message: 'User or Email already in use' });
      }
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      if(!ObjectId.isValid(req.params.userId) || !ObjectId.isValid(req.params.friendId)){
        return res.status(404).json({
          message: 'ID is invalid!',
        });
      }
      const friend = await User.findOne( { _id: req.params.friendId } );
      if (!friend) {
        return res.status(404).json({ message: 'Friend not found in Users!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friend._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Friend found, but no user found!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      if(!ObjectId.isValid(req.params.userId)){
        return res.status(404).json({
          message: 'ID is invalid!',
        });
      }
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      if(!ObjectId.isValid(req.params.userId)){
        return res.status(404).json({
          message: 'ID is invalid!',
        });
      }
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      const thoughtRay = user.thoughts;
      const numberRay = [];
      for(let i = 0; i < thoughtRay.length; i++){
        numberRay.push(thoughtRay[i].valueOf());
      }
      await Thought.deleteMany({ _id: { $in: numberRay }},);

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      if(!ObjectId.isValid(req.params.userId) || !ObjectId.isValid(req.params.friendId)){
        return res.status(404).json({
          message: 'ID is invalid!',
        });
      }
      const friend = await User.findOne( { _id: req.params.friendId } );
      if (!friend) {
        return res.status(404).json({ message: 'Friend not found in Users!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: friend._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'Friend successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
