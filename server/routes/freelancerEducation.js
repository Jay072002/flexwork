const {
  verifyTokenAndFreelancer,
  verifyToken,
} = require("../middleware/verifyToken");

const {
  addEducation,
  updateEducation,
  removeEducation,
  getEducations,
} = require("../controller/freelancerEducation");

const router = require("express").Router();

router.post("/:profileId", verifyTokenAndFreelancer, addEducation);
router.put("/:educationId", verifyTokenAndFreelancer, updateEducation);
router.delete("/:educationId", verifyTokenAndFreelancer, removeEducation);
router.get("/:profileId", verifyToken, getEducations);

module.exports = router;
