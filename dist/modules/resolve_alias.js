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
        const web3 = await getWeb3(context);
        const ens = web3.eth.ens;
        const result = await ens.getAddress(alias);
        return result;
    }
    catch (e) {
        this.logger.log(`Managed Exception ${heat_server_common_1.prettyPrint(e)}`);
    }
    return null;
}
let web3Factory;
function getWeb3(context) {
    return new Promise((resolve) => {
        if (!web3Factory) {
            web3Factory = new web3_factory_1.Web3Factory(`${context.protocol}://${context.host}`);
            setTimeout(() => resolve(web3Factory.getWeb3()), 1000);
        }
        resolve(web3Factory.getWeb3());
    });
}
//# sourceMappingURL=resolve_alias.js.map