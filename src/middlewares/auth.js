const adminAuth = (req, res, next) => {
  console.log("Checking admin authorization");
  const token = "xyz";
  const isAuthorization = token === "xyz";
  if (!isAuthorization) {
    res.status(401).send("Unauthorized admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Checking user authorization");
  const token = "xyz";
  const isAuthorization = token === "xyz";
  if (!isAuthorization) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
