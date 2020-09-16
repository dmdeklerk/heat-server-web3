import { ResolveAliasParam, ResolveAliasResult, tryParse, CallContext, ModuleResponse, prettyPrint } from 'heat-server-common'
const Web3 = require('web3');

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

let _web3;
function getWeb3(context: CallContext) {
  return (_web3 = _web3 || new Web3(`${context.protocol}://${context.host}`));
}