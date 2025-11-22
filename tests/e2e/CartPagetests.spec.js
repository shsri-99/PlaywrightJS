// tests/e2e/CartPagetests.spec.js
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { CartPO } = require('../pageObjects/CartPO');
const dataset = require('../utils/JsonData.json');
const { LoginPO } = require('../pageObjects/LoginPO');
const { CheckoutPO } = require('../pageObjects/CheckoutPO');

test.describe.configure({mode : 'parallel'});

test.describe('Cart end to end in parallel',()=>{
let token;
let apiContext;
let apiUtils;

const loginPayload = {
  userEmail: dataset.email,
  userPassword: dataset.pass
};

const itemPayload = {
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

test.beforeAll(async () => {
  // create one API context and API utils for the whole file
  apiContext = await request.newContext();
  apiUtils = new APIUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
  console.log(token, ":This is token for all tests");
});

test.afterAll(async () => {
  if (apiContext) await apiContext.dispose();
});
test.beforeEach(async ({ page }) => {
  await apiUtils.AddItemToCartAPI(token, itemPayload);
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
  await page.goto(dataset.loginlink);
  await page.waitForLoadState('networkidle');
});


test('@Web Add item to cart', async ({ page }) => {
  
  const cart = new CartPO(page);
  const checkoutpage = new CheckoutPO(page);
  await expect(page.getByText(loginpage.expectedMessage)).toBeVisible();

  await cart.clickAddToCartByIndex(2);
  await expect(cart.productAddedLocator()).toBeVisible();
  await cart.goToCart();
  await expect(page.getByText('My Cart')).toBeVisible();
});

test('@Web Verify order id', async ({ page }) => {
  const cart = new CartPO(page);
  const checkoutpage = new CheckoutPO(page);
  await cart.goToCart();
  await page.waitForLoadState('networkidle');

  await checkoutpage.clickCheckout();
  const emailValue = await checkoutpage.emailValidator();
  await expect(emailValue).toBe(dataset.email);

  await checkoutpage.countrySelect(dataset.country);
  await checkoutpage.placeOrder();

  const orderId = await checkoutpage.getOrderLabel();
  console.log("This is trimmed OrderId: ", orderId);

  await checkoutpage.navigatetoOrders();
  await checkoutpage.locateorderIdinOrderList(orderId);

  const observedProduct = await checkoutpage.renderProductName(dataset.ProductName);
  await expect(observedProduct).toHaveText(dataset.ProductName);
});

test('@Web Validate checkbox and confirm no products are found',async({page})=>{
const cart = new CartPO(page);
await page.waitForLoadState('networkidle');
await cart.selectCheckbox(dataset.label);
await expect(cart.alert).toBeVisible();
await expect(cart.alert).toHaveText(/No Products Found/i);
await cart.unselectCheckbox(dataset.label);
});
});
