"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Factory = void 0;
const Web3 = require('web3');
const newProvider = (url) => new Web3.providers.WebsocketProvider(url, {
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 5,
        onTimeout: false,
    },
});
class Web3Factory {
    constructor(url) {
        this.url = url;
        this.web3 = new Web3(newProvider(this.url));
        this.checkActive = () => {
            if (!this.web3.currentProvider.connected) {
                this.web3.setProvider(newProvider(this.url));
            }
        };
        setInterval(this.checkActive, 2000);
    }
    getWeb3() {
        this.checkActive();
        return this.web3;
    }
}
exports.Web3Factory = Web3Factory;
//# sourceMappingURL=web3_factory.js.map