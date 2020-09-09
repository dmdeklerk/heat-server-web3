import { PublicKeyLookupParam, PublicKeyLookupResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function publicKeyLookup(context: CallContext, param: PublicKeyLookupParam): Promise<ModuleResponse<PublicKeyLookupResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { addrXpub } = param
    const url = `${protocol}://${host}/api/GET-PUBLICKEY?addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
    const publicKey: string = '';
    
    return {
      value: {
        publicKey,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}