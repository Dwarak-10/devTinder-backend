const validator = require("validator");

const validationData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please Enter a valid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid Password!");
  }
};

module.exports = { validationData };
