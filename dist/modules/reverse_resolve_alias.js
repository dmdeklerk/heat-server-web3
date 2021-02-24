"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseResolveAlias = void 0;
const heat_server_common_1 = require("heat-server-common");
const namehash = require('eth-ens-namehash');
const web3_factory_1 = require("../lib/web3_factory");
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
        const url = `${context.protocol}://${context.host}`;
        const web3 = web3_factory_1.getWeb3(url);
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
//# sourceMappingURL=reverse_resolve_alias.js.map