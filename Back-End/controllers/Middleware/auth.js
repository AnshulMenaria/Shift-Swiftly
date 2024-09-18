const User = require("../../models/userModel");
const auth = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
      return res.json({ status: 401, message: "Unauthorized Request" });
    }
    const token = authHeader.split(" ")[1];
    const { _id } = JwtService.verify(token);
    const user = User.find({ _id });
    if (user) {
      next();
    } else {
      return res.json({ status: 401, message: "Invalid token" });
    }
  } catch (error) {
    if (error?.name) {
      return res.json({
        status: 500,
        message: error?.name,
        error: error,
      });
    } else {
      return res.json({
        status: 500,
        message: error?.name,
      });
    }
  }
};
module.exports = auth;
