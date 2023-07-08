const JWT = require("jsonwebtoken");
const GENERATE_TOKEN = (id) => {
  const JWT_KEY = process.env.JWT_SECRET_KEY;
  try {
    const generateToken = JWT.sign({ id }, JWT_KEY, { expiresIn: "1d" });
    return generateToken;
  } catch (error) {
    return error;
  }
};
module.exports = GENERATE_TOKEN;
