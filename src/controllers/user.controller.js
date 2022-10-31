const userModel = require("../models/user.model");
const userAuth = require("../auth/user.auth");
const uuid = require("uuid");

const login_user = async (req, res) => {
  let result = await userModel.login(req.body);

  if (result.length == 0) {
    res.status(200).json({ message: "Email or password is incorrect" });
    return;
  }

  let checkPassword = await userAuth.compare(
    req.body.password,
    result.password
  );

  if (checkPassword) {
    res.status(200).json({
      message: "Login successfully",
      data: { user_id: result.user_id, email: result.email },
    });
    return;
  }
  res.status(200).json({ message: "Email or password is incorrect" });
  return;
};

const register_user = async (req, res) => {
  if (!req.body) {
    res.status(200).json({ message: "Invalid request body" });
  }

  let email_exist = await userModel.find_user_by_email(req.body.email);

  if (req.body.password.length < 6) {
    res.status(301).json({ message: "Password must be at least 6 characters" });
    return;
  }

  if (!email_exist) {
    res.status(301).json({ message: "Email already registered" });
    return;
  }

  let password = await userAuth.hash(req.body.password);
  let result = await userModel.register({
    user_id: uuid.v1(),
    email: req.body.email,
    password: password,
  });

  res.status(200).json({ message: "Register successfully", data: result });
};

module.exports = {
  login_user,
  register_user,
};
