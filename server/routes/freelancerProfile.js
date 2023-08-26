const {
  verifyTokenAndFreelancer,
  verifyToken,
} = require("../middleware/verifyToken");
const {
  updateProfile,
  getProfile,
} = require("../controller/freelancerProfile");

const router = require("express").Router();

router.put("/:userId", verifyTokenAndFreelancer, updateProfile);
router.get("/:userId", verifyToken, getProfile);

module.exports = router;
