const db = require("../models/model.js");

const User = db.users;
// add user in users table
const addUser = async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const user = await User.create(info);
  res.status(200).send(user);
};

// get one user from users
const getOneUser = async (req, res) => {
  let id = req.params.id;
  console.log(req.query.email);
  const user = await User.findOne({ where: { email: req.query.email } });
  res.status(200).send(user);
};

module.exports = { addUser, getOneUser };
