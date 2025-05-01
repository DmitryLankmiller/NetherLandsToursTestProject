import { sleep } from 'crawlee';
import { config } from '../../config.js';
import { FlightDatesTable } from './flightDatesTable.element.js';
import { HolidaySelector } from './holidaySelector.element.js';

export class TourPage {
  /**
   * @param {import("playwright").Page} page
   */
  constructor(page) {
    this.page = page;
    this.priceTab = this.page.locator('id=tab-prices');
    this.waitPricesTable = this.page.locator('id=matrix-wait-box');
    this.receipt = this.page.locator('id=receipt');
    this.waitGetPrices = this.receipt.locator('xpath=.//*[@class="fl pnlwait1"]');
    this.waitTripCheck = this.receipt.locator('xpath=.//*[@class="fl pnlwait2"]');
    this.filters = this.page.locator('id=matrFil');
    this.airportRow = this.filters.locator('xpath=.//*[contains(@class, "airport")]');
    this.airportRowCheckBoxes = this.airportRow.locator('xpath=.//*[@id="checks"]//label');
    this.arirportRowConfirmBtn = this.airportRow.locator('xpath=.//input[@value="Toepassen"]');
    this.flightDatesTableRoot = this.page.locator('xpath=.//*[@class="date fl"]');
    this.flightDatesTable = new FlightDatesTable(this.flightDatesTableRoot);
    this.holidaySelectorRoot = this.page.locator('id=pnlTrips');
    this.holidaySelector = new HolidaySelector(this.holidaySelectorRoot);
  }

  async openPriceTab() {
    await this.priceTab.click();
  }

  async waitForPriceTableLoading(waitInterval) {
    while (await this.waitPricesTable.isVisible()) {
      await sleep(waitInterval || config.waitInterval);
    }
  }

  async waitForGetPricesLoading(waitInterval) {
    while (await this.waitGetPrices.isVisible()) {
      await sleep(waitInterval || config.waitInterval);
    }
  }

  async waitForTripCheckLoading(waitInterval) {
    while (await this.waitTripCheck.isVisible()) {
      await sleep(waitInterval || config.waitInterval);
    }
  }

  /**
   * @param {string[]} values
   */
  async selectAirports(values) {
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

  /**
   * @param {string} date
   * @param {string} duration
   */
  async selectTourDateAndDuration(date, duration) {
    await this.flightDatesTableRoot.waitFor({ state: 'visible' });
    await this.flightDatesTable.clickTourBtn(date, duration);
  }

  async selectHolidayWithLowestPrice() {
    await this.holidaySelectorRoot.waitFor({ state: 'visible' });
    await this.holidaySelector.showMoreTrips();
    await this.holidaySelector.clickLowestPrice();
  }
}
