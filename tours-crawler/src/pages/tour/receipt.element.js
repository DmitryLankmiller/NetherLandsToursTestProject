export class ReceiptElement {
  /**
   * @param {import("playwright").Locator} root
   */
  constructor(root) {
    this.root = root;
    this.price = this.root.locator('xpath=.//dl[contains(@class, "price")]//dd');
    this.priceCurrency = this.price.locator('xpath=.//*[@class="currency"]');
  }

  async getPriceString() {
    return (await this.price.innerText()).trim();
  }

  async getPriceCurrency() {
    return await this.priceCurrency.innerText();
  }

  async getPriceNumber() {
    const priceString = await this.price.innerText();
    return Number(priceString.split(' ')[1].replace(',', '.'));
  }
}
