const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = {
  userEmail: "diana.kurian@gmail.com",
  userPassword: "Password@1234"
};

const ItemLoad = {
   _id: "690fcd5af669d6cb0a4b0238",
    product: {
      _id: "68a961459320a140fe1ca57a",
      productName: "ZARA COAT 3",
      productAddedBy: "admin",
      productCategory: "electronics",
      productDescription: "Apple phone",
      productFor: "women",
      productImage: "https://rahulshettyacademy.com/api/ecom/uploads/...jpg",
      productPrice: 11500,
      productRating: "0",
      productStatus: true,
      productSubCategory: "mobiles",
      productTotalOrders: "0",
      __v: 0
    }
};


test('Login using API', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  let token = await apiUtils.getToken();
  console.log('Token:', token);
  let response = await apiUtils.AddItemToCartAPI(token,ItemLoad);
  console.log('Add to cart response:', response);
}); 