import { Logger, ConsoleTransport, ProxyTransport } from '@axiomhq/logging';

export const logger = new Logger({
  transports: [
    new ProxyTransport({ url: '/api/axiom', autoFlush: true }),
    new ConsoleTransport({ prettyPrint: process.env.NODE_ENV !== 'production' }),
  ],
});

if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    logger.error('window.error', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
    });
  });
  window.addEventListener('unhandledrejection', (e) => {
    logger.error('unhandledrejection', { reason: String(e.reason) });
  });
}
