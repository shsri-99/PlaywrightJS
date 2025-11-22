const {test,expect} = require('@playwright/test');
const { only } = require('node:test');


test('Test case with browser',async ({browser}) =>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator('#username').fill("Shruti");
await page.locator("[type ='password']").fill("learning");
await page.locator("#signInBtn").click();
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

test('Valid login test case with page',async({page})=>{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator('#username').fill("rahulshettyacademy");
await page.locator("[type ='password']").fill("learning");
await page.locator("#signInBtn").click();
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await page.waitForSelector('app-card .card-title a');
const cardTitle = await page.locator("app-card .card-title a");
console.log(await cardTitle.count());
console.log(await cardTitle.allTextContents());
});

test('UI Controls',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const checkbox = page.locator('#terms');
    const documentLink = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
    await dropdown.selectOption("consult");
    await page.getByRole('radio', { name: 'User' }).check();
    //Assertion checking if radiobutton user is checked
    await expect(page.getByRole('radio',{name:'User'})).toBeChecked();
    page.locator("#okayBtn").click();
    await checkbox.check();   
    await expect(checkbox).toBeChecked();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});

test.only('Child window handling test', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");

const [newPage] = await Promise.all([
context.waitForEvent('page'),//listen for any new page to open and catch it 
documentLink.click(),
])//newpage is opened
const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain =  await arrayText[1].split(" ")[0];
console.log(domain);
await page.locator("#username").fill(domain);
console.log(await page.locator("#username").inputValue());
});