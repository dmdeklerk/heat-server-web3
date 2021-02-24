"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeb3 = void 0;
const Web3 = require('web3');
const servers = new Map();
function getWeb3(url) {
    if (servers.has(url)) {
        return servers.get(url);
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(url));
    servers.set(url, web3);
    return web3;
}
exports.getWeb3 = getWeb3;
//# sourceMappingURL=web3_factory.js.map