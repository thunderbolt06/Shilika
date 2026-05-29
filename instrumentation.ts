import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { createOnRequestError } from '@axiomhq/nextjs';
import { logger } from './lib/axiom';

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (!process.env.AXIOM_TOKEN || !process.env.AXIOM_DATASET) return;

  const host = process.env.AXIOM_HOST ?? 'api.axiom.co';

  const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'shilika-website',
    }),
    spanProcessors: [
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: `https://${host}/v1/traces`,
          headers: {
            Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
            'X-Axiom-Dataset': process.env.AXIOM_DATASET,
          },
        }),
      ),
    ],
  });

  provider.register();
}

export const onRequestError = createOnRequestError(logger);
