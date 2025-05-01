import { createPlaywrightRouter, sleep } from 'crawlee';
import { TourPage } from './pages/tour/tour.page.js';

export const router = createPlaywrightRouter();

router.addHandler('tour-page', async ({ request, page, log, pushData }) => {
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });

  const tourPage = new TourPage(page);
  await tourPage.openPriceTab();
  await tourPage.waitForPriceTableLoading();
  await tourPage.selectAirports(['Amsterdam', 'Antwerpen', 'Brussel Charleroi']);
  await tourPage.waitForPriceTableLoading();
  await tourPage.selectTourDateAndDuration('di 9 dec', '7');
  await tourPage.waitForGetPricesLoading();
  await tourPage.selectHolidayWithLowestPrice();
  await tourPage.waitForTripCheckLoading();
  const priceInfo = await tourPage.getPriceInfo();
  console.log(priceInfo);
  await pushData({
    url: request.loadedUrl,
    title,
    ...priceInfo,
  });
});
