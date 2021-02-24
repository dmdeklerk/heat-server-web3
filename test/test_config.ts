import { MonitoredRequest, CallContext, createLogger } from 'heat-server-common';

// export const testConfig = {
//   protocol: 'wss',
//   host: 'eth1.heatwallet.com/ws'
// }
export const testConfig = {
  protocol: 'https',
  host: 'eth1.heatwallet.com/rpc'
}

export function createContext(label?: string) {
  let { host, protocol } = testConfig;
  let logger = createLogger(label)
  let context: CallContext = {
    host,
    protocol,
    logger,
    req: new MonitoredRequest(logger, label ? label : '')
  }
  return context
}