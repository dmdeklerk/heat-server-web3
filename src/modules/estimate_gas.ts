import { CallContext, ModuleResponse, tryParse, EstimateGasParam, EstimateGasResult } from 'heat-server-common'
import { getWeb3 } from '../lib/web3_factory';

export async function estimateGas(context: CallContext, param: EstimateGasParam): Promise<ModuleResponse<EstimateGasResult>> {
  try {
    const { blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit } = param
    const url = `${context.protocol}://${context.host}`
    const web3 = getWeb3(url);
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
