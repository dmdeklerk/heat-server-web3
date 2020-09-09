import { TokenDiscoveryParam, TokenDiscoveryResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function tokenDiscovery(context: CallContext, param: TokenDiscoveryParam): Promise<ModuleResponse<Array<TokenDiscoveryResult>>> {
  try {
    const { req, protocol, host, logger } = context
    const { addrXpub, assetType } = param
    const url = `${protocol}://${host}/api/DISCOVER-TOKENS?assetType=${assetType}&addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json, logger);

    const result: Array<TokenDiscoveryResult> = []

    // Process 'data' while populating result array
    const func = (input) => {
      const assetId: string = ''
      const assetType: number = 0
      const value: string = ''
      const exists: boolean = false
      return {
        assetId, assetType, value, exists
      }
    } 

    return {
      value: result,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}