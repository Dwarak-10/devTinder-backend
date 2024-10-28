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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "about",
    "gender",
    "photoUrl",
    "skills",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validationData, validateEditProfileData };
