const bcrypt = require("bcrypt");

// password hash
const Hash_Password = async (password) => {
  try {
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);
    return hash_password;
  } catch (error) {
    return error;
  }
};

// compare password
const Compare_Password = async (password, hashPassword) => {
  return bcrypt
    .compare(password, hashPassword)
    .then((res) => res)
    .catch((error) => error);
};

module.exports = { Hash_Password, Compare_Password };
