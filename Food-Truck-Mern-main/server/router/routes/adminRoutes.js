import express from "express"

import {
    getAllUser,
    getUserLoginDetails,
    deleteAllUsers,
    deleteAllVendor,
    deleteVendor,
    deleteVendorAllProduct,
    getAllProducts,
} from "../../controllers/adminController.js"
import { authenticate, roleAuthentication } from "../../middlewares/AuthMiddleware.js";


const router = express.Router();

router.get("/all/users", authenticate, roleAuthentication(["admin"]), getAllUser);
// router.get("/all/Products", authenticate, roleAuthentication(["admin"]), getAllProducts);

router.get("/user/login", authenticate, roleAuthentication(["admin"]), getUserLoginDetails);

router.delete("/all/users/delete", authenticate, roleAuthentication(["admin"]), deleteAllUsers);

router.delete("/all/vendor", authenticate, roleAuthentication(["admin"]), deleteAllVendor);

router.delete("/vendor/:id", authenticate, roleAuthentication(["admin"]), deleteVendor);

router.delete("/vendor/product/:id", authenticate, roleAuthentication(["admin,"]), deleteVendorAllProduct);


export default router;