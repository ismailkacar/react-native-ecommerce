import { Router } from "express";
import {} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/user.controller.js";
import {
  getWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../controllers/user.controller.js";

const router = Router();

router.use(protectRoute);

//Address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

//Wishlist Routes
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.post("/wishlist", addToWishlist);

export default router;
