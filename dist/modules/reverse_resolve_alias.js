"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseResolveAlias = void 0;
const heat_server_common_1 = require("heat-server-common");
const web3_factory_1 = require("../lib/web3_factory");
const namehash = require('eth-ens-namehash');
async function reverseResolveAlias(context, param) {
    try {
        const { middleWare } = context;
        const { addrXpub } = param;
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
    }
    catch (e) {
        return {
            error: e.message,
        };
    }
}
exports.reverseResolveAlias = reverseResolveAlias;
async function getReverseAddressAlias(context, address) {
    const { logger } = context;
    try {
        const web3 = getWeb3(context);
        const lookup = address.toLowerCase().substr(2) + '.addr.reverse';
        const ResolverContract = await web3.eth.ens.getResolver(lookup);
        const nh = namehash.hash(lookup);
        const name = await ResolverContract.methods.name(nh).call();
        if (name) {
            const aliasAdress = await getAliasAddress(context, name);
            if (aliasAdress == address) {
                return name;
            }
        }
    }
    catch (e) {
        logger.log(`Managed Exception ${heat_server_common_1.prettyPrint(e)}`);
    }
    return null;
}
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
let web3Factory;
function getWeb3(context) {
    web3Factory = web3Factory || (web3Factory = new web3_factory_1.Web3Factory(`${context.protocol}://${context.host}`));
    return web3Factory.getWeb3();
}
//# sourceMappingURL=reverse_resolve_alias.js.map