const UserData = require("../models").User;
var auth = require("../auth/authentication");
var Global = require("../global");

module.exports = {
  login(req, res) {
    var username = req.body.username || "";
    var password = req.body.password || "";
    return UserData.findAll({
      where: {
        username: username,
        password: password
      }
    })
      .then(userData => {
        if (userData.length === 0) {
          return res.status(404).send({
            message: "userData Not Found"
          });
        }
        Global.userId = userData[0].get("id");
        return res.status(200).send({
          token: auth.encodeToken(userData[0].get("id")),
          username: username
        });
      })
      .catch(error => {
        console.log(error, "error?");
        res.status(400).send(error);
      });
  },
  create(req, res) {
    return UserData.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return UserData.all()
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return UserData.findById(req.params.userId, {
      include: [
        {
          model: UserData,
          as: "users"
        }
      ]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return user
          .update({
            username: req.body.username || user.username,
            password: req.body.password || user.password
          })
          .then(() => res.status(200).send(user)) // Send back the updated todo.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return UserData.findById(req.params.usernameId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: "User Not Found"
          });
        }
        return user
          .destroy()
          .then(() =>
            res.status(200).send({ message: "User deleted successfully." })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
