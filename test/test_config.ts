import { Logger } from '@nestjs/common';
import { MonitoredRequest, CallContext } from 'heat-server-common';

export const testConfig = {
  protocol: 'http',
  host: 'localhost:3000'
}

export function createContext(label?: string) {
  let { host, protocol } = testConfig;
  let logger = new Logger()
  let context: CallContext = {
    host,
    protocol,
    logger,
    req: new MonitoredRequest(logger, label ? label : '')
  }
  return context
}

