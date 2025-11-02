const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../tests/APIUtils');

const loginPayLoad = {
  userEmail: "diana.joseph@gmail.com",
  userPassword: "Password123"
};

const ItemLoad = {
  "_id": "68e2cf40f669d6cb0aff3e43",
  "product": {
    "_id": "68a961719320a140fe1ca57c",
    "productName": "ADIDAS ORIGINAL",
    "productCategory": "electronics",
    "productSubCategory": "mobiles",
    "productPrice": 11500,
    "productDescription": "Apple phone",
    "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg",
    "productRating": "0",
    "productTotalOrders": "0",
    "productStatus": true,
    "productFor": "women",
    "productAddedBy": "admin",
    "__v": 0
  }
  };
test('Login using API', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  let token = await apiUtils.getToken();
  console.log('Token:', token);
  let response = await apiUtils.AddItemToCartAPI(ItemLoad);
  console.log('Add to cart response:', response);
});