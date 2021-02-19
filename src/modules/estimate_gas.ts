import { CallContext, ModuleResponse, tryParse, EstimateGasParam, EstimateGasResult } from 'heat-server-common'
import { Web3Factory } from '../lib/web3_factory';

export async function estimateGas(context: CallContext, param: EstimateGasParam): Promise<ModuleResponse<EstimateGasResult>> {
  try {
    const { blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit } = param
    const web3 = getWeb3(context);
    const abiObject = tryParse(abi)
    const contract = new web3.eth.Contract(abiObject, assetId);
    const gasAmount = await contract.methods.transfer(addrXpub, value).estimateGas({from, gas: gasLimit})
    return {
      value: {
        value: gasAmount,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}

let web3Factory;
function getWeb3(context: CallContext) {
  web3Factory = web3Factory || (web3Factory = new Web3Factory(`${context.protocol}://${context.host}`));
  return web3Factory.getWeb3()
}