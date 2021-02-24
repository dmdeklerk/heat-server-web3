"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = void 0;
const heat_server_common_1 = require("heat-server-common");
const web3_factory_1 = require("../lib/web3_factory");
async function estimateGas(context, param) {
    try {
        const { blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit } = param;
        const url = `${context.protocol}://${context.host}`;
        const web3 = web3_factory_1.getWeb3(url);
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
//# sourceMappingURL=estimate_gas.js.map