import { Logger } from '@nestjs/common';
import { MonitoredRequest, CallContext } from 'heat-server-common';

export const testConfig = {
  protocol: 'ws',
  host: 'eth1.heatwallet.com:8036'
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