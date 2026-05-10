import express from "express";
import {
  login,
  logout,
  signup,
  onboard,
  changePassword,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
router.post("/onboarding", protectRoute, onboard);
router.put("/change-password", protectRoute, changePassword);
router.put("/update-profile", protectRoute, updateProfile);

export default router;