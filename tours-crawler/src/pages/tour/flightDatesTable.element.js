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
    const durationValues = await this.tourDurations.allInnerTexts();
    const durationIndex = durationValues.indexOf(duration);

    const dateValues = await this.startDates.allInnerTexts();
    const dateIndex = dateValues.indexOf(date);

    await this.getTourBtn(dateIndex + 1, durationIndex).click();
  }
}
