"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAlias = void 0;
const heat_server_common_1 = require("heat-server-common");
const Web3 = require('web3');
async function resolveAlias(context, param) {
    try {
        const { alias } = param;
        const addrXpub = await getAliasAddress(context, alias);
        const isPermanent = false;
        return {
            value: {
                addrXpub,
                isPermanent,
            },
        };
    }
    catch (e) {
        return {
            error: e.message,
        };
    }
}
exports.resolveAlias = resolveAlias;
async function getAliasAddress(context, alias) {
    try {
        const web3 = getWeb3(context);
        const ens = web3.eth.ens;
        const result = await ens.getAddress(alias);
        return result;
    }
    catch (e) {
        this.logger.log(`Managed Exception ${heat_server_common_1.prettyPrint(e)}`);
    }
    return null;
}
let _web3;
function getWeb3(context) {
    return (_web3 = _web3 || new Web3(`${context.protocol}://${context.host}`));
}
//# sourceMappingURL=resolve_alias.js.map