class LoginPO{
constructor(page){
    this.page = page;
    this.loginlink = 'https://rahulshettyacademy.com/client/#/auth/login';
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.expectedMessage = 'Automation Practice';
}
async navigateLogin(){
    await this.page.goto(this.loginlink);
}
async getEmailInput(email){
    await this.emailInput.fill(email);
}
async getPasswordInput(pass){
    await this.passwordInput.fill(pass);
}

async loginButtonClick(){
    await this.loginButton.click();
}
}

module.exports = { LoginPO };