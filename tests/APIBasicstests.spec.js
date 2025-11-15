const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../tests/utils/APIUtils');

const loginPayLoad = {
  userEmail: "diana.kurian@gmail.com",
  userPassword: "Password@1234"
};

const ItemLoad = {
  product_id: "68a961959320a140fe1ca57e"
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