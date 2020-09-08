import { ResolveAliasParam, ResolveAliasResult, tryParse } from 'heat-server-common'
import { CallContext } from '../call_context.interface'

export async function resolveAlias(context: CallContext, param: ResolveAliasParam): Promise<{ error?: string, value?: ResolveAliasResult }> {
  try {
    const { req, protocol, host } = context
    const { alias } = param
    const url = `${protocol}://${host}/api/RESOLVE_ALIAS?alias=${alias}`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const addrXpub: string = undefined;
    const isPermanent: boolean = undefined;
    
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