import { airports, tourDate, tourDuration } from './tripScrapperConfig.js';

export const tripScrapperLabel = 'trip-page';

export async function tripScrapper({ request, page, log, pushData }) {
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });
  const tripPage = new TourPage(page);
  await tripPage.openPriceTab();
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectAirports(airports);
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectTourDateAndDuration(tourDate, tourDuration);
  await tripPage.waitForGetPricesLoading();
  await tripPage.selectHolidayWithLowestPrice();
  await tripPage.waitForTripCheckLoading();
  const priceInfo = await tripPage.getPriceInfo();
  console.log(priceInfo);
  await pushData({
    url: request.loadedUrl,
    title,
    ...priceInfo,
  });
}
