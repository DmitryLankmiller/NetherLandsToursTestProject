import { TourPage } from '../../../pages/prijsvrij/trip/trip.page.js';
import { airports, tripDate, tripDuration } from './tripScrapperConfig.js';

export const tripScrapperLabel = 'trip-page';

/**
 * @param {Omit<PlaywrightCrawlingContext<Dictionary>, "request"> & {request: LoadedRequest<...>;}} param0
 */
export async function tripScrapper({ request, page, log, pushData }) {
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });
  const tripPage = new TourPage(page);
  await tripPage.openPriceTab();
  log.info('Openned price tab');
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectAirports(airports);
  log.info('Select airports:', airports);
  log.info('Wait for price table loading...');
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectTourDateAndDuration(tripDate, tripDuration);
  log.info(`Select tour with date ${tripDate} and duration ${tripDuration} days`);
  log.info('Wait for getting price loading...');
  await tripPage.waitForGetPricesLoading();
  await tripPage.selectHolidayWithLowestPrice();
  log.info('Select holiday with lowest price');
  log.info('Wait for trips check loading...');
  await tripPage.waitForTripCheckLoading();
  const priceInfo = await tripPage.getPriceInfo();
  log.info(`Extract price: ${priceInfo.price}`);
  await pushData({
    url: request.loadedUrl,
    title: title,
    searchedAirports: airports,
    tripDate: tripDate,
    days: tripDuration,
    ...priceInfo,
  });
  log.info('Saved new row');
}
