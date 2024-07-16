const url = "http://localhost:5000";

const ENDPOINT = {
  signup: `${url}/api/signup`,
  signin: `${url}/api/signin`,
  logout: `${url}/api/logout`,
  getUser: `${url}/api/get-user`,
  allusers: `${url}/api/all-users`,
  updatePassword: `${url}/api/update-password`,
  updateUserRole: `${url}/api/update-user-role`,

  uploadProduct: `${url}/api/upload-product`,
  updateProduct: `${url}/api/update-product`,
  allProducts: `${url}/api/all-products`,
  categoryList: `${url}/api/category-list`,
  categoryProducts: `${url}/api/category-products`,
  productDetails: `${url}/api/product`,
  searchProducts: `${url}/api/search`,
  filterProducts: `${url}/api/filter-products`,

  addToCart: `${url}/api/add-to-cart`,
  cartProducts: `${url}/api/cart-products`,
  updateQuantity: `${url}/api/update-quantity`,
  deleteCartItem: `${url}/api/delete-cart-product`,
};

export default ENDPOINT;
