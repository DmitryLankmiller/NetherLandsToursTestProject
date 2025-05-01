import { createPlaywrightRouter, sleep } from 'crawlee';
import { TourPage } from './pages/prijsvrij/trip/trip.page.js';

export const router = createPlaywrightRouter();

router.addHandler('tour-page', async ({ request, page, log, pushData }) => {
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });

  const tripPage = new TourPage(page);
  await tripPage.openPriceTab();
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectAirports(['Amsterdam', 'Antwerpen', 'Brussel Charleroi']);
  await tripPage.waitForPriceTableLoading();
  await tripPage.selectTourDateAndDuration('di 9 dec', '7');
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
});
