const jwt = require("jsonwebtoken");
const { errorLog } = require("../helper/logHelper");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    errorLog("No Token");
    return res.status(400).json({ isToken: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.user = decoded;

    return next();
  } catch (error) {
    errorLog("Invalid Token");
    return res.status(401).json({ isToken: false });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      return next();
    }

    return res.status(403).json({ message: "You Are Not Allowed To Do That" });
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    }

    return res.status(403).json({ message: "You Are Not Allowed To Do That" });
  });
};

const verifyTokenAndClient = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isClient) {
      return next();
    }

    return res.status(403).json({ message: "You Are Not Allowed To Do That" });
  });
};

const verifyTokenAndFreelancer = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isClient) {
      return next();
    }

    return res.status(403).json({ message: "You Are Not Allowed To Do That" });
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndClient,
  verifyTokenAndFreelancer,
};
