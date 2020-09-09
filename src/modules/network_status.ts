import { NetworkStatusParam, NetworkStatusResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function networkStatus(context: CallContext, param: NetworkStatusParam): Promise<ModuleResponse<NetworkStatusResult>> {
  try {
    const { req, protocol, host, logger } = context
    const url = `${protocol}://${host}/api/GET-NETWORK-STATUS`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
    const lastBlockTime: Date = new Date();
    const lastBlockHeight: number = 0;
    const lastBlockId: string = '';
    
    return {
      value: {
        lastBlockTime,
        lastBlockHeight,
        lastBlockId,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}