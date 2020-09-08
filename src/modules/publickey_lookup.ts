import { PublicKeyLookupParam, PublicKeyLookupResult, tryParse } from 'heat-server-common'
import { CallContext } from '../call_context.interface'

export async function publicKeyLookup(context: CallContext, param: PublicKeyLookupParam): Promise<{ error?: string, value?: PublicKeyLookupResult }> {
  try {
    const { req, protocol, host } = context
    const { addrXpub } = param
    const url = `${protocol}://${host}/api/GET-PUBLICKEY?addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const publicKey: string = undefined;
    
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