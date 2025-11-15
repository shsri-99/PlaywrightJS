class RegisterationPO{
constructor(page){
    this.page = page;
    this.link ='https://rahulshettyacademy.com/client/#/auth/register';
    this.firstname = page.getByPlaceholder('First Name');
    this.lastname = page.getByPlaceholder('Last Name');
    this.useremail = page.locator('#userEmail');
    this.phonenumber = page.locator('input[formcontrolname="userMobile"]');
    this.occupation = page.locator('select[formcontrolname="occupation"]');
    this.gender = page.getByRole('radio', { name: 'Female' });
    this.password = page.locator('#userPassword');
    this.confirmPassword = page.getByPlaceholder('Confirm Passsword');
    this.condition =page.locator('input[formcontrolname="required"]');
    this.submit = page.locator('input[type ="submit"]');
    this.successMessage = 'Account Created Successfully';
}

async navigate(){
    await this.page.goto(this.link);
}
async getFullName(fname,lname){
    await this.firstname.fill(fname);
    await this.lastname.fill(lname);
}
async getContactAddress(email,phone){
    await this.useremail.fill(email);
    await this.phonenumber.fill(phone);
}
async getOccupation(optionEngineer){
await this.occupation.click();
await this.occupation.selectOption(optionEngineer);
}
async getGender(){
    await this.gender.check();
}
async getPasswordsConfirmed(pass){
    await this.password.fill(pass);
    await this.confirmPassword.fill(pass);
}
async getConditionChecked(){
   await this.condition.check();
}

async submitButton(){
   await this.submit.click();
}

}
module.exports = { RegisterationPO };