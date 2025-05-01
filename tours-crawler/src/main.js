import { PlaywrightCrawler } from 'crawlee';
import { router } from './routes.js';
import { tripScrapperLabel } from './handlers/prijsvrij/trip/tripScrapper.js';
import { proxyConfiguration } from './proxy.js';

const startUrls = [
  {
    url: 'https://www.prijsvrij.nl/vakanties/spanje/costa-del-sol/marbella/monarque-sultan',
    label: tripScrapperLabel,
  },
];

const crawler = new PlaywrightCrawler({
  requestHandler: router,
  proxyConfiguration: proxyConfiguration,
});

await crawler.run(startUrls);
