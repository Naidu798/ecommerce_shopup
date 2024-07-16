const express = require("express");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

// Auth and users imports
const userSignupController = require("../controller/user/userSignup");
const userSigninController = require("../controller/user/userSignin");
const userLogoutController = require("../controller/user/userLogout");
const updatePasswordController = require("../controller/user/updatePassword");
const getUserController = require("../controller/user/getUser");
const allUsersController = require("../controller/user/allUsers");
const updateRoleController = require("../controller/user/updateRole");

// products imports
const uploadProductController = require("../controller/product/uploadProduct");
const allProductsController = require("../controller/product/allProducts");
const updateProductController = require("../controller/product/updateProduct");
const categoryListController = require("../controller/product/categoryList");
const categoryProductsController = require("../controller/product/categoryProducts");
const productDetailsController = require("../controller/product/productDetails");
const searchProductController = require("../controller/product/searchProduct");
const filterProductsController = require("../controller/product/filterProducts");

// cart imports
const addProductToCart = require("../controller/cart/addProductToCart");
const cartProductsController = require("../controller/cart/cartProducts");
const updateProductQuantity = require("../controller/cart/updateProductQuantity");
const deleteCartProductController = require("../controller/cart/deleteCartProduct");

// Auth
router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.post("/logout", protectRoute, userLogoutController);

// users
router.get("/get-user", protectRoute, getUserController);
router.put("/update-password", updatePasswordController);
router.get("/all-users", protectRoute, allUsersController);
router.put("/update-user-role", protectRoute, updateRoleController);

// products
router.post("/upload-product", protectRoute, uploadProductController);
router.get("/all-products", allProductsController);
router.put("/update-product", protectRoute, updateProductController);
router.get("/category-list", categoryListController);
router.get("/category-products", categoryProductsController);
router.get("/product/:productId", productDetailsController);
router.get("/search", searchProductController);
router.post("/filter-products", filterProductsController);

// cart
router.post("/add-to-cart", protectRoute, addProductToCart);
router.get("/cart-products/:userId", protectRoute, cartProductsController);
router.put("/update-quantity", protectRoute, updateProductQuantity);
router.delete(
  "/delete-cart-product",
  protectRoute,
  deleteCartProductController
);

module.exports = router;
