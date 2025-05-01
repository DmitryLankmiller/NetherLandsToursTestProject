export class HolidaySelector {
  /**
   * @param {import("playwright").Locator} root
   */
  constructor(root) {
    this.root = root;
    this.elementsPrices = this.root.locator('xpath=.//li//*[contains(@class, "price")]');
    this.showMoreTripsBtn = this.root.locator('xpath=.//*[contains(@class, "showHiddenTrips")]');
  }

  async showMoreTrips() {
    if (await this.showMoreTripsBtn.isVisible()) {
      await this.showMoreTripsBtn.click();
    }
  }

  async getAllPrices() {
    const pricesStr = await this.elementsPrices.allInnerTexts();
    const prices = pricesStr.map((el) => Number(el.split(' ')[1].replace('.', '')));
    return prices;
  }

  async clickNthPrice(index) {
    await this.elementsPrices.nth(index).click();
  }

  async clickLowestPrice() {
    const prices = await this.getAllPrices();
    const lowestPrice = Math.min(...prices);
    const lowestPriceIndex = prices.indexOf(lowestPrice);
    await this.clickNthPrice(lowestPriceIndex);
  }
}
