const { createWishlistProject, getWishlistProject } = require("../controller/freelancerWishlistProject");
const { verifyTokenAndFreelancer, verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const router = require("express").Router();



// create a wishlist project
router.post("/", verifyTokenAndAuthorization, createWishlistProject);

// get all wishlist project
router.get("/", verifyTokenAndAuthorization, getWishlistProject);

// delete wishlist project
router.delete("/:wishlistId", verifyTokenAndAuthorization,)

module.exports = router;