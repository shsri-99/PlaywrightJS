const {test,expect,request} = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { CartPO } = require('../pageObjects/CartPO');
const dataset = JSON.parse(JSON.stringify(require("../utils/JsonData.json")));
const { LoginPO } = require('../pageObjects/LoginPO');
const { beforeEach } = require('node:test');
const { CheckoutPO } = require('../pageObjects/CheckoutPO');
let token;

const loginPayload2 = {
    userEmail: dataset.email,
    userPassword: dataset.pass
};


test.beforeAll(async()=>{
const apiContext = await request.newContext();
const apiUtils = await new APIUtils(apiContext,loginPayload2);
token = await apiUtils.getToken();
console.log(token," :This is token for all tests");
});

test.beforeEach(async({page})=> {
await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
});

test('@Web Login using API and add item to cart', async({page})=>{
const loginpage = new LoginPO(page);
const cart = new CartPO(page);
const checkoutpage = new CheckoutPO(page);
await loginpage.navigateLogin(dataset.loginlink);
await page.goto(dataset.loginlink);
await expect(page.getByText(loginpage.expectedMessage)).toBeVisible();
await cart.clickAddToCartByIndex(2);
await expect(cart.productAddedLocator()).toBeVisible();
await cart.goToCart();
await expect(page.getByText('My Cart')).toBeVisible();

await page.goto(dataset.loginlink);
await cart.goToCart();
await page.waitForLoadState('networkidle');
await checkoutpage.clickCheckout();
const emailValue = await checkoutpage.emailValidator();
await expect(emailValue).toBe(dataset.email);
await checkoutpage.countrySelect(dataset.country);
await checkoutpage.placeOrder();
const orderId = await checkoutpage.getOrderLabel();
await console.log("This is trimmed OrderId: ", orderId);
await checkoutpage.navigatetoOrders();
await checkoutpage.locateorderIdinOrderList(orderId);
const observedProduct = await checkoutpage.renderProductName(dataset.ProductName);
await expect(observedProduct).toHaveText(dataset.ProductName);
  });