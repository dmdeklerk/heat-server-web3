import { NetworkStatusParam, NetworkStatusResult, tryParse, CallContext } from 'heat-server-common'

export async function networkStatus(context: CallContext, param: NetworkStatusParam): Promise<{ error?: string, value?: NetworkStatusResult }> {
  try {
    const { req, protocol, host } = context
    const url = `${protocol}://${host}/api/GET-NETWORK-STATUS`;
    const json = await req.get(url);
    const data = tryParse(json);
    
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