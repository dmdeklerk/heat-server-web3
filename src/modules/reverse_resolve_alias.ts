import { ReverseResolveAliasParam, ReverseResolveAliasResult, tryParse, CallContext, ModuleResponse, prettyPrint } from 'heat-server-common'
import { Web3Factory } from '../lib/web3_factory';
const namehash = require('eth-ens-namehash');

export async function reverseResolveAlias(context: CallContext, param: ReverseResolveAliasParam): Promise<ModuleResponse<ReverseResolveAliasResult>> {
  try {
    const { middleWare } = context
    const { addrXpub } = param
    const addrXpub_ = middleWare
      ? await middleWare.getAddress(addrXpub)
      : addrXpub;
    const alias = await getReverseAddressAlias(context, addrXpub_);
    const isPermanent = false;
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

async function getReverseAddressAlias(context: CallContext, address: string): Promise<string> {
  const { logger } = context  
  try {
    const web3 = getWeb3(context);
    const lookup = address.toLowerCase().substr(2) + '.addr.reverse';
    const ResolverContract = await web3.eth.ens.getResolver(lookup);
    const nh = namehash.hash(lookup);
    const name = await ResolverContract.methods.name(nh).call();
    if (name) {
      // Must enforce accuracy as per https://docs.ens.domains/dapp-developer-guide/resolving-names
      //
      // ENS does not enforce the accuracy of reverse records - for instance, anyone may claim that the
      // name for their address is 'alice.eth'. To be certain that the claim is accurate,
      // you must always perform a forward resolution for the returned name and check it matches the
      // original address.
      const aliasAdress = await getAliasAddress(context, name);
      if (aliasAdress == address) {
        return name;
      }
    }
  } catch (e) {
    logger.log(`Managed Exception ${prettyPrint(e)}`);
  }
  return null;
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