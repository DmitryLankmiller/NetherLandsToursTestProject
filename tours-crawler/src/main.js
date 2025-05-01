import { PlaywrightCrawler } from 'crawlee';
import { router } from './routes.js';
import { tripScrapperLabel } from './handlers/prijsvrij/trip/tripScrapper.js';

const startUrls = [
  {
    url: 'https://www.prijsvrij.nl/vakanties/spanje/costa-del-sol/marbella/monarque-sultan',
    label: tripScrapperLabel,
  },
];

const crawler = new PlaywrightCrawler({
  requestHandler: router,
});

await crawler.run(startUrls);
