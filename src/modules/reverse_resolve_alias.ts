import { ReverseResolveAliasParam, ReverseResolveAliasResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function reverseResolveAlias(context: CallContext, param: ReverseResolveAliasParam): Promise<ModuleResponse<ReverseResolveAliasResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { addrXpub } = param
    const url = `${protocol}://${host}/api/RESOLVE_ALIAS?addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
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