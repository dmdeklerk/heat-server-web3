"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAlias = void 0;
const heat_server_common_1 = require("heat-server-common");
const web3_factory_1 = require("../lib/web3_factory");
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
        const url = `${context.protocol}://${context.host}`;
        const web3 = web3_factory_1.getWeb3(url);
        const ens = web3.eth.ens;
        const result = await ens.getAddress(alias);
        return result;
    }
    catch (e) {
        this.logger.log(`Managed Exception ${heat_server_common_1.prettyPrint(e)}`);
    }
    return null;
}
//# sourceMappingURL=resolve_alias.js.map