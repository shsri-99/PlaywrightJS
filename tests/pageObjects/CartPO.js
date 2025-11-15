class CartPO{
    constructor(page){
        this.page = page;
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]');
        this.addToCartButtons = ( ) => this.page.getByRole('button', { name: 'Add To Cart' });
        this.productAddedText = 'Product Added To Cart';
        this.myCartText = 'My Cart';
    }

    lastCheckboxInGroup(groupText) {
    return this.page
      .locator('.form-group', { hasText: groupText })
      .locator('input[type="checkbox"]')
      .last().check();
  }

  
  // wait for network idle (useful after actions that trigger network)
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // click Add To Cart by zero-based index (default 2 matches nth(2) in your original)
  async clickAddToCartByIndex(index = 2) {
    // get the buttons collection then click nth(index)
    const btn = this.addToCartButtons().nth(index);
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }

  // returns a locator for the "Product Added To Cart" message so the test can assert
  productAddedLocator() {
    return this.page.getByText(this.productAddedText, { exact: true });
  }

  // click the cart button in header/toolbar
  async goToCart() {
    await this.cartButton.waitFor({ state: 'visible' });
    await this.cartButton.click();
  }

}

module.exports = { CartPO };
