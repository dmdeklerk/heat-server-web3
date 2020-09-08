import { TokenDiscoveryParam, TokenDiscoveryResult, tryParse } from 'heat-server-common'
import { CallContext } from '../call_context.interface'

export async function tokenDiscovery(context: CallContext, param: TokenDiscoveryParam): Promise<{ error?: string, value?: Array<TokenDiscoveryResult> }> {
  try {
    const { req, protocol, host } = context
    const { addrXpub, assetType } = param
    const url = `${protocol}://${host}/api/DISCOVER-TOKENS?assetType=${assetType}&addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json);

    const result: Array<TokenDiscoveryResult> = []

    // Process 'data' while populating result array
    const func = (input) => {
      const assetId: string = undefined
      const assetType: number = undefined
      const value: string = undefined
      const exists: boolean = undefined
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