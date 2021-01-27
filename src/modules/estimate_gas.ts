import { CallContext, ModuleResponse, tryParse, EstimateGasParam, EstimateGasResult } from 'heat-server-common'
const Web3 = require('web3');

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

let _web3;
function getWeb3(context: CallContext) {
  return (_web3 = _web3 || new Web3(`${context.protocol}://${context.host}`));
}