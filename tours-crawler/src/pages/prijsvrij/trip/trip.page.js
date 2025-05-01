import { sleep } from 'crawlee';
import { config } from '../../../config.js';
import { FlightDatesTable } from './flightDatesTable.element.js';
import { HolidaySelector } from './holidaySelector.element.js';
import { ReceiptElement } from './receipt.element.js';
import { FiltersElement } from './filters.element.js';

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
    this.flightDatesTableRoot = this.page.locator('xpath=.//*[@class="date fl"]');
    this.filtersElement = new FiltersElement(this.filters);
    this.flightDatesTable = new FlightDatesTable(this.flightDatesTableRoot);
    this.holidaySelectorRoot = this.page.locator('id=pnlTrips');
    this.holidaySelector = new HolidaySelector(this.holidaySelectorRoot);
    this.receiptElement = new ReceiptElement(this.receipt);
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
    await this.filtersElement.expandAirportsSelector();
    await this.filtersElement.selectAirports(values);
    await this.filtersElement.clickConfirmSelectedAirportsBtn();
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

  async getPriceInfo() {
    return {
      price: await this.receiptElement.getPriceString(),
      currency: await this.receiptElement.getPriceCurrency(),
      value: await this.receiptElement.getPriceNumber(),
    };
  }

  async getDepartureAirport() {
    return await this.receiptElement.getOutgoingDeparture();
  }
}
