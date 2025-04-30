export class FlightDatesTable {
  /**
   * @param {import("playwright").Locator} root
   */
  constructor(root) {
    this.root = root;
    this.header = this.root.locator('xpath=.//*[@class="matrix-head"]');
    this.table = this.root.locator('xpath=.//table');
    this.tourDurations = this.table.locator('xpath=.//thead//th');
    this.startDates = this.table.locator('xpath=.//tr/td[1]');
  }

  getTourBtn(rowIndex, columnIndex) {
    return this.table.locator('xpath=.//tr').nth(rowIndex).locator('xpath=.//td').nth(columnIndex);
  }

  /**
   * @param {string} date
   * @param {string} duration
   */
  async clickTourBtn(date, duration) {
    await this.table.waitFor({ state: 'visible' });

    const durationValues = [];
    for (let durationLocator of await this.tourDurations.all()) {
      durationValues.push(await durationLocator.innerText());
    }
    const durationIndex = durationValues.indexOf(duration);

    const dateValues = [];
    for (let dateLocator of await this.startDates.all()) {
      dateValues.push(await dateLocator.innerText());
    }
    console.log(dateValues);

    const dateIndex = dateValues.indexOf(date);
    console.log(dateIndex);

    await this.getTourBtn(dateIndex + 1, durationIndex).click();
  }
}
