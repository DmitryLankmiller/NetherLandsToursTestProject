import { createPlaywrightRouter, sleep } from 'crawlee';
import { tripScrapper, tripScrapperLabel } from './handlers/prijsvrij/trip/tripScrapper.js';

export const router = createPlaywrightRouter();

router.addHandler(tripScrapperLabel, tripScrapper);
