import { ProxyConfiguration } from 'crawlee';

const availableProxyUrls = [[null]];

export const proxyConfiguration = new ProxyConfiguration({
  tieredProxyUrls: availableProxyUrls,
});
