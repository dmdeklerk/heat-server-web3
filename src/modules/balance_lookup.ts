import { BalanceLookupParam, BalanceLookupResult, tryParse, CallContext } from 'heat-server-common'

export async function balanceLookup(context: CallContext, param: BalanceLookupParam): Promise<{ error?: string, value?: BalanceLookupResult }> {
  try {
    const { req, protocol, host } = context
    const { assetType, addrXpub } = param
    const url = `${protocol}://${host}/api/GET-BALANCE?assetType=${assetType}&addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const value: string = undefined;
    const exists: boolean = undefined;
    
    return {
      value: {
        value,
        exists,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}