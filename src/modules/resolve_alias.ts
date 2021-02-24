import { ResolveAliasParam, ResolveAliasResult, CallContext, ModuleResponse, prettyPrint } from 'heat-server-common'
import { getWeb3 } from '../lib/web3_factory';

export async function resolveAlias(context: CallContext, param: ResolveAliasParam): Promise<ModuleResponse<ResolveAliasResult>> {
  try {
    const { alias } = param
    const addrXpub = await getAliasAddress(context, alias);
    const isPermanent = false;
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

async function getAliasAddress(context: CallContext, alias: string): Promise<string> {
  try {
    const url = `${context.protocol}://${context.host}`
    const web3 = getWeb3(url);
    const ens = web3.eth.ens;
    const result = await ens.getAddress(alias);
    return result;
  } catch (e) {
    this.logger.log(`Managed Exception ${prettyPrint(e)}`);
  }
  return null;
}