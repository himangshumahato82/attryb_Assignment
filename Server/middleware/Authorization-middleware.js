const JWT = require("jsonwebtoken");
const Authorization = async (req, res, Next) => {
  //   console.log(req.headers.authorization);
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_SECRET_KEY;
  try {
    const verifyUser = JWT.verify(token, JWT_KEY);
    console.log(verifyUser);
    req.UserId = verifyUser.id;
    Next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = Authorization;
