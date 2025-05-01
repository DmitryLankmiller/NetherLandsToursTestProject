export class FiltersElement {
  /**
   * @param {import("playwright").Locator} root
   */
  constructor(root) {
    this.root = root;
    this.airportRow = this.root.locator('xpath=.//*[contains(@class, "airport")]');
    this.airportRowCheckBoxes = this.airportRow.locator('xpath=.//*[@id="checks"]//label');
    this.arirportRowConfirmBtn = this.airportRow.locator('xpath=.//input[@value="Toepassen"]');
  }

  async expandAirportsSelector() {
    await this.airportRow.click();
  }

  /**
   * @param {string[]} values
   */
  async selectAirports(values) {
    const labels = await this.airportRowCheckBoxes.all();
    for (let label of labels) {
      const labelText = await label.innerText();
      if (values.includes(labelText)) {
        await label.click();
      }
    }
  }

  async clickConfirmSelectedAirportsBtn() {
    await this.arirportRowConfirmBtn.click();
  }
}
