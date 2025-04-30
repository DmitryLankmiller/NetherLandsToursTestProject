import { PlaywrightCrawler } from 'crawlee';
import { router } from './routes.js';

const startUrls = [
  {
    url: 'https://www.prijsvrij.nl/vakanties/spanje/costa-del-sol/marbella/monarque-sultan',
    label: 'tour-page',
  },
];

const crawler = new PlaywrightCrawler({
  requestHandler: router,
});

await crawler.run(startUrls);
