import { ReverseResolveAliasParam, ReverseResolveAliasResult, tryParse, CallContext } from 'heat-server-common'

export async function reverseResolveAlias(context: CallContext, param: ReverseResolveAliasParam): Promise<{ error?: string, value?: ReverseResolveAliasResult }> {
  try {
    const { req, protocol, host } = context
    const { addrXpub } = param
    const url = `${protocol}://${host}/api/RESOLVE_ALIAS?addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const alias: string = '';
    const isPermanent: boolean = false;
    
    return {
      value: {
        alias,
        isPermanent,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}