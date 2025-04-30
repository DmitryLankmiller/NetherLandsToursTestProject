import { sleep } from 'crawlee';
// import { Page } from 'playwright';
import { config } from '../../config.js';

export class TourPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.priceTab = this.page.locator('id=tab-prices');
    this.waitBox = this.page.locator('id="matrix-wait-box');
    this.filters = this.page.locator('id=matrFil');
    this.airportRow = this.filters.locator('xpath=.//*[contains(@class, "airport")]');
    this.airportRowCheckBoxes = this.airportRow.locator('xpath=.//*[@id="checks"]//label');
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

  /**
   * @param {string[]} values
   */
  async selectAirportsByValue(values) {
    await this.airportRow.click();
    const labels = await this.airportRowCheckBoxes.all();
    const filteredLabels = [];

    for (let label of labels) {
      const labelText = await label.innerText();
      if (values.includes(labelText)) {
        filteredLabels.push(label);
      }
    }

    for (let label of filteredLabels) {
      await label.click();
    }

    await this.arirportRowConfirmBtn.click();
  }
}
