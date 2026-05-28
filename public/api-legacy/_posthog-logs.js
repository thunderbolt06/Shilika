// =====================================================================
// PostHog Logs (OpenTelemetry) - EU region
// Initializes once per warm Lambda; exports a logger + flush helper.
// =====================================================================

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { logs } from '@opentelemetry/api-logs';

const POSTHOG_KEY =
  process.env.POSTHOG_PROJECT_KEY ||
  'phc_xRRqNvS3aMZ4atSebhV3cikL3MGN8oP4H6UFdsD6wj2M';

const POSTHOG_LOGS_URL = 'https://eu.i.posthog.com/i/v1/logs';

let _sdk = null;
let _processor = null;
let _initialized = false;

function init() {
  if (_initialized) return;
  _initialized = true;

  _processor = new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: POSTHOG_LOGS_URL,
      headers: { Authorization: `Bearer ${POSTHOG_KEY}` }
    })
  );

  _sdk = new NodeSDK({
    resource: resourceFromAttributes({
      'service.name': 'shilika-site-api',
      'service.environment': process.env.VERCEL_ENV || 'development'
    }),
    logRecordProcessor: _processor
  });

  try {
    _sdk.start();
  } catch (err) {
    // Never let logging setup crash the request path.
    console.error('PostHog logs init failed:', err);
  }
}

export function getLogger(name = 'shilika-api') {
  init();
  return logs.getLogger(name);
}

// In serverless, the process can be frozen right after the response.
// Call this before returning so the batch processor ships its buffer.
export async function flushLogs() {
  if (!_processor) return;
  try {
    await _processor.forceFlush();
  } catch (err) {
    console.error('PostHog logs flush failed:', err);
  }
}
