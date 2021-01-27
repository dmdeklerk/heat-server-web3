"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explorer = void 0;
const heat_server_common_1 = require("heat-server-common");
const resolve_alias_1 = require("./modules/resolve_alias");
const reverse_resolve_alias_1 = require("./modules/reverse_resolve_alias");
const estimate_gas_1 = require("./modules/estimate_gas");
const ID = "web3";
const modules = {
    resolveAlias: resolve_alias_1.resolveAlias,
    reverseResolveAlias: reverse_resolve_alias_1.reverseResolveAlias,
    estimateGas: estimate_gas_1.estimateGas,
};
class Explorer extends heat_server_common_1.ExplorerBase {
    constructor(protocol, host, rateLimiter, apiKey, middleWare) {
        super(ID, protocol, host, modules, middleWare);
        this.host = host;
        this.rateLimiter = rateLimiter;
    }
}
exports.Explorer = Explorer;
//# sourceMappingURL=explorer.js.map