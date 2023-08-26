const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
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
router.get("/:userId", verifyTokenAndAuthorization, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);

module.exports = router;
