const { createWishlistProject, getWishlistProject, deleteWishlistProject } = require("../controller/freelancerWishlistProject");
const { verifyTokenAndFreelancer, verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const router = require("express").Router();



// create a wishlist project
router.post("/", verifyTokenAndFreelancer, createWishlistProject);

// get all wishlist project
router.get("/", verifyTokenAndFreelancer, getWishlistProject);

// delete wishlist project
router.delete("/:projectId", verifyTokenAndFreelancer, deleteWishlistProject)

module.exports = router;