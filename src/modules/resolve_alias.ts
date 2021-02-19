import { ResolveAliasParam, ResolveAliasResult, CallContext, ModuleResponse, prettyPrint } from 'heat-server-common'
import { Web3Factory } from '../lib/web3_factory';

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
    const web3 = getWeb3(context);
    const ens = web3.eth.ens;
    const result = await ens.getAddress(alias);
    return result;
  } catch (e) {
    this.logger.log(`Managed Exception ${prettyPrint(e)}`);
  }
  return null;
}

let web3Factory;
function getWeb3(context: CallContext) {
  web3Factory = web3Factory || (web3Factory = new Web3Factory(`${context.protocol}://${context.host}`));
  return web3Factory.getWeb3()
}