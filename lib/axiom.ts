import { Axiom } from '@axiomhq/js';
import { AxiomJSTransport, ConsoleTransport, Logger, type Transport } from '@axiomhq/logging';

const token = process.env.AXIOM_TOKEN;
const dataset = process.env.AXIOM_DATASET;

const consoleTransport = new ConsoleTransport({ prettyPrint: process.env.NODE_ENV !== 'production' });

const transports: [Transport, ...Transport[]] =
  token && dataset
    ? [
        new AxiomJSTransport({
          axiom: new Axiom({
            token,
            ...(process.env.AXIOM_HOST ? { url: `https://${process.env.AXIOM_HOST}` } : {}),
          }),
          dataset,
        }),
        consoleTransport,
      ]
    : [consoleTransport];

export const logger = new Logger({ transports });

export async function flushLogs() {
  await logger.flush();
}
