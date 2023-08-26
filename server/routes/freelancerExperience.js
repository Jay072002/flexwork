const {
  verifyTokenAndFreelancer,
  verifyToken,
} = require("../middleware/verifyToken");

const {
  addExperience,
  updateExperience,
  removeExperience,
  getExperiences,
} = require("../controller/freelancerExperience");

const router = require("express").Router();

router.post("/:profileId", verifyTokenAndFreelancer, addExperience);
router.put("/:experienceId", verifyTokenAndFreelancer, updateExperience);
router.delete("/:experienceId", verifyTokenAndFreelancer, removeExperience);
router.get("/:profileId", verifyToken, getExperiences);

module.exports = router;
