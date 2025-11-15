class CheckoutPO{
    constructor(page){
        this.page = page;
        this.checkoutButton = page.getByRole('button',{name : 'Checkout'});
        this.emailInput = page.locator('input.text-validated:visible').nth(1);
        this.countryInput = page.locator("[placeholder*='Country']");
        this.placeOrderButton = page.getByText('Place Order');
        this.orderLabel =page.locator('label.ng-star-inserted');
        this.myordersLink =page.locator('button[routerlink="/dashboard/myorders"]');
    }       

    async clickCheckout(){
        await this.checkoutButton.click();
    }
    async emailValidator(email){
      return await this.emailInput.inputValue();
    }
    async countrySelect(country) {
  await this.countryInput.type(country, { delay: 150 });
  await this.page.waitForSelector('button.ta-item', { state: 'visible' });
  await this.page
    .locator('button.ta-item')
    .filter({ hasText: /^\s*India\s*$/ })
    .click();
}
    async placeOrder(){
        await this.placeOrderButton.click();
    }
    async getOrderLabel(){
        const orderId = await this.orderLabel.textContent();
        const trimmedOrderId = await orderId.replace(/\|/g, '').trim();
        return trimmedOrderId;
    }

    async navigatetoOrders(){
        await this.myordersLink.click();
         await this.page.waitForLoadState('networkidle');
    }
    async locateorderIdinOrderList(trimmedOrderId){
        await this.page.waitForSelector('table');
        const orderRow =  await this.page.locator(`tr:has(th:text-is("${trimmedOrderId}"))`);
        await orderRow.locator('button.btn.btn-primary').click();
    }

    async renderProductName(ProductName){
       return await this.page.getByText(ProductName);
        
    }
}
module.exports = { CheckoutPO };