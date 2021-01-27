"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = void 0;
const heat_server_common_1 = require("heat-server-common");
const Web3 = require('web3');
async function estimateGas(context, param) {
    try {
        const { blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit } = param;
        const web3 = getWeb3(context);
        const abiObject = heat_server_common_1.tryParse(abi);
        const contract = new web3.eth.Contract(abiObject, assetId);
        const gasAmount = await contract.methods.transfer(addrXpub, value).estimateGas({ from, gas: gasLimit });
        return {
            value: {
                value: gasAmount,
            },
        };
    }
    catch (e) {
        return {
            error: e.message,
        };
    }
}
exports.estimateGas = estimateGas;
let _web3;
function getWeb3(context) {
    return (_web3 = _web3 || new Web3(`${context.protocol}://${context.host}`));
}
//# sourceMappingURL=estimate_gas.js.map