const{test,expect}=require('@playwright/test');
const { RegisterationPO } = require('../pageObjects/RegisterationPO');
const { LoginPO } = require('../pageObjects/LoginPO');
const dataset = JSON.parse(JSON.stringify(require("../utils/JsonData.json")));


test('@Web Registeration page',async({page})=>
{
const registerationPo = new RegisterationPO(page);

await registerationPo.navigate(dataset.link);
await registerationPo.getFullName(dataset.fname,dataset.lname);
await registerationPo.getContactAddress(dataset.email,dataset.phone);
await registerationPo.getOccupation(dataset.optionEngineer);
await registerationPo.getGender();
await registerationPo.getPasswordsConfirmed(dataset.pass);
await registerationPo.getConditionChecked();
await registerationPo.submitButton();
await expect(page.getByText(registerationPo.successMessage)).toBeVisible();
});

test.only('Login Page', async({page})=>{
const loginPage = new LoginPO(page);
await loginPage.navigateLogin(dataset.loginlink);
await loginPage.getEmailInput(dataset.email);
await loginPage.getPasswordInput(dataset.pass);
await loginPage.loginButtonClick();
await expect(page.getByText(loginPage.expectedMessage)).toBeVisible();
}
);