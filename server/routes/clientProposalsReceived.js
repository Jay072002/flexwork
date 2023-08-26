const router = require("express").Router();

const {
  getSingleProposal,
  getAllProposals,
  approveProposal,
  rejectProposal,
  deleteProposal,
} = require("../controller/clientProposalsReceived");

const {
  verifyTokenAndClient,
  verifyToken,
} = require("../middleware/verifyToken");

router.get("/", verifyTokenAndClient, getAllProposals);
router.get("/:proposalId", verifyTokenAndClient, getSingleProposal);
router.put("/:proposalId", verifyTokenAndClient, approveProposal);
router.delete("/:proposalId", verifyTokenAndClient, rejectProposal);
router.post("/:proposalId", verifyToken, deleteProposal);

module.exports = router;
