const{test,expect} = require('@playwright/test');

test('Registeration',async({page})=>{
await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
await page.getByRole('link',{name : 'Register'});
await page.getByPlaceholder('First Name').fill("Diana");
await page.getByPlaceholder('Last Name').fill("Joseph");
await page.locator('#userEmail').fill("diana.joseph@gmail.com");
await page.locator('input[formcontrolname="userMobile"]').fill('1234567890');
const dropdownReg = await page.locator('select[formcontrolname="occupation"]');
await dropdownReg.click();
await dropdownReg.selectOption('3: Engineer');
await  page.getByRole('radio', { name: 'Female' }).check();
await page.locator('#userPassword').fill("Password123");
await page.getByPlaceholder('Confirm Passsword').fill("Password123");
await page.locator('input[formcontrolname="required"]').check();
await page.locator('input[type ="submit"]').click();

});

test.only('Login page validations', async({page})=>{
    const email = 'diana.joseph@gmail.com';
    const password = 'Password123';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('input[type="email"]').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Automation Practice')).toBeVisible();
    
    await page.locator('.form-group', { hasText: 'household' }).locator('input[type="checkbox"]').last().check();
    await expect(page.getByText('No Products Found')).toBeVisible({ timeout: 5000 });
    await page.locator('.form-group', { hasText: 'household' }).locator('input[type="checkbox"]').last().uncheck();
   await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Add To Cart' }).nth(2).click();
    await expect(page.getByText('Product Added To Cart', { exact: true })).toBeVisible();
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await expect(page.getByText('My Cart')).toBeVisible();
    
    
    await page.getByRole('button',{name : 'Checkout'}).click();
    const emailInput = page.locator('input.text-validated:visible').nth(1);
    await expect(emailInput).toHaveValue(email);
  const countryInput = page.locator("[placeholder*='Country']");
    await countryInput.type('ind', { delay: 150 });
    await page.locator('button.ta-item').filter({ hasText: /^\s*India\s*$/ }).click();
    await page.getByText('Place Order').click();
    //page.waitForLoadState('load');
    const orderLabel = page.locator('label.ng-star-inserted');
     const orderId = await orderLabel.textContent();
     const trimmedOrderId = orderId.replace(/\|/g, '').trim();
    console.log('Order ID:', trimmedOrderId);

    
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.waitForSelector('table');
    const orderRow = await page.locator(`tr:has(th:text-is("${trimmedOrderId}"))`);
    await orderRow.locator('button.btn.btn-primary').click();
    const observedItem = await page.getByText('iphone 13 pro');
    await expect(observedItem).toHaveText('iphone 13 pro');
    
});