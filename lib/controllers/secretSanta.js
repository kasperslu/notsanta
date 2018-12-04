const mongoose = require('mongoose');
const uniqid = require('uniqid');
const SecretSanta = mongoose.model('SecretSanta');

class SecretSantaController {
  async postSecretSanta(req, res) {
    try {
      const newSecretSanta = new SecretSanta({ _id: uniqid.process(), ...req.body });
      const savedSecretSanta = await newSecretSanta.save();
      res.status(201).send(savedSecretSanta);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(400).send(err.message);
      }
      res.status(500).send(err);
    }
  }

  async getSecretSanta(req, res) {
    const { id } = req.params;

    try {
      const secretSanta = await SecretSanta.findOne({ _id: id });
      secretSanta.friends = secretSanta.friends.map(friend => ({
        name: friend.name,
        active: friend.active,
      }));
      res.status(200).send(secretSanta);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(400).send(err.message);
      }
      res.status(500).send(err);
    }
  }

  async putSecretSanta(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const secretSanta = await SecretSanta.findOne({ _id: id });

      const userIndex = secretSanta.friends.findIndex(friend => friend.name === name);

      if (!secretSanta.friends[userIndex].active) {
        res.status(400).send('This user is not active anymore.');
        return;
      }

      const availableFriends = secretSanta.friends.filter(friend => name !== friend.name && friend.available);
      const randomFriend = availableFriends[Math.floor(Math.random() * availableFriends.length)];
      const randomFriendIndex = secretSanta.friends.findIndex(friend => friend.name === randomFriend.name);

      const { friends } = secretSanta;
      friends[randomFriendIndex].available = false;
      friends[userIndex].active = false;

      await SecretSanta.findOneAndUpdate({ _id: id }, { friends }, { new: true });

      res.status(200).send(randomFriend.name);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(400).send(err.message);
      }
      res.status(500).send(err);
    }
  }
};

module.exports = new SecretSantaController();
