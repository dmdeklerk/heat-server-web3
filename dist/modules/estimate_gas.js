"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = void 0;
const heat_server_common_1 = require("heat-server-common");
const web3_factory_1 = require("../lib/web3_factory");
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
let web3Factory;
function getWeb3(context) {
    web3Factory = web3Factory || (web3Factory = new web3_factory_1.Web3Factory(`${context.protocol}://${context.host}`));
    return web3Factory.getWeb3();
}
//# sourceMappingURL=estimate_gas.js.map