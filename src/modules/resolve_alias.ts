import { ResolveAliasParam, ResolveAliasResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function resolveAlias(context: CallContext, param: ResolveAliasParam): Promise<ModuleResponse<ResolveAliasResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { alias } = param
    const url = `${protocol}://${host}/api/RESOLVE_ALIAS?alias=${alias}`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
    const addrXpub: string = '';
    const isPermanent: boolean = false;
    
    return {
      value: {
        addrXpub,
        isPermanent,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}