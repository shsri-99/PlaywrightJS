const { json } = require("stream/consumers");

class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
  
    console.log('Status:', loginResponse.status());
    const loginJsonResponse = await loginResponse.json();
    console.log('Response body:', loginJsonResponse);

    const token = loginJsonResponse.token;
    return token;
  }

  async AddItemToCartAPI(token,ItemLoad){
    let response = {};
   const itemResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/user/add-to-cart",
      {
        data: ItemLoad,
        headers: {
          Authorization:token,
          "Content-Type": "application/json"
        }
      }
    );
    await console.log("Token sending in this call:",token);
    console.log('Status:', itemResponse.status());
    const itemResponseJson = await itemResponse.json();
    console.log(itemResponseJson);
    return itemResponseJson;
  }
}

module.exports = { APIUtils };