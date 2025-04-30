import { sleep } from 'crawlee';
import { BasePage } from '../base.page';
import { Page } from 'playwright';
import { config } from '../../config';

export class TourPage extends BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.priceTab = this.page.locator('id=tab-prices');
    this.waitBox = this.page.locator('id="matrix-wait-box');
    this.filters = this.page.locator('id=matrFil');
    this.airportRow = this.filters.locator('xpath=.//*[contains(@class, "airport")]');
    this.airportRowCheckBoxes = this.airportRow.locator('xpath=.//*[@id="checks"]//input');
    this.arirportRowConfirmBtn = this.airportRow.locator('xpath=.//input[@value="Toepassen"]');
  }

  async openPriceTab() {
    await this.priceTab.click();
  }

  async waitForLoading(waitInterval) {
    while (await this.waitBox.isVisible()) {
      await sleep(waitInterval || config.waitInterval);
    }
  }
}
