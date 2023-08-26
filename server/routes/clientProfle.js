const {
  verifyToken,
  verifyTokenAndClient,
} = require("../middleware/verifyToken");
const {
  createProfile,
  updateProfile,
  getProfile,
} = require("../controller/clientProfile");

const router = require("express").Router();

router.put("/:userId", verifyTokenAndClient, updateProfile);
router.get("/:userId", verifyToken, getProfile);

module.exports = router;
