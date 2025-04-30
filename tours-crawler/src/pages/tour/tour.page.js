import { BasePage } from '../base.page';
import { Page } from 'playwright';

export class TourPage extends BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.priceTab = this.page.locator('id=tab-prices');
  }

  async openPriceTab() {
    await this.priceTab.click();
  }
}
