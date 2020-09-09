import { BalanceLookupParam, BalanceLookupResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function balanceLookup(context: CallContext, param: BalanceLookupParam): Promise<ModuleResponse<BalanceLookupResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { assetType, addrXpub } = param
    const url = `${protocol}://${host}/api/GET-BALANCE?assetType=${assetType}&addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
    const value: string = '';
    const exists: boolean = false;
    
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