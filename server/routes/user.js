const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/verifyToken");

const {
  updateUser,
  removeUser,
  getUser,
  getUsers,
} = require("../controller/user");
const { upload } = require("../middleware/uploadFile");

const router = require("express").Router();

router.put(
  "/:userId",
  verifyTokenAndAuthorization,
  upload.single("file"),
  updateUser
);
router.delete("/:userId", verifyTokenAndAuthorization, removeUser);
router.get("/:userId", verifyToken, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);

module.exports = router;
