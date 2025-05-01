import { ProxyConfiguration } from 'crawlee';

const availableProxyUrls = [
  [null],
  // ["http://proxy-example.org"]
];

export const proxyConfiguration = new ProxyConfiguration({
  tieredProxyUrls: availableProxyUrls,
});
