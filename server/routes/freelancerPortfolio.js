const {
  verifyTokenAndFreelancer,
  verifyToken,
} = require("../middleware/verifyToken");

const { upload, uploadTOS3 } = require("../middleware/uploadFile");

const {
  addPortfolio,
  updatePortfolio,
  removePortfolio,
  getPortfolios,
} = require("../controller/freelancerPortfolio");

const router = require("express").Router();

router.post(
  "/:profileId",
  verifyTokenAndFreelancer,
  upload.single("file"),
  addPortfolio
);
router.put(
  "/:portfolioId",
  verifyTokenAndFreelancer,
  upload.single("file"),
  updatePortfolio
);

router.delete("/:portfolioId", verifyTokenAndFreelancer, removePortfolio);
router.get("/:profileId", verifyToken, getPortfolios);

module.exports = router;
