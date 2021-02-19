const Web3 = require('web3');

const newProvider = (url) => new Web3.providers.WebsocketProvider(url, {
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false,
  },
})

export class Web3Factory {
  private web3: any;
  private checkActive: () => void;

  constructor(private url: string) {
    this.web3 = new Web3(newProvider(this.url))
    this.checkActive = () => {
      if (!this.web3.currentProvider.connected) {
        this.web3.setProvider(newProvider(this.url))
      }
    }
    setInterval(this.checkActive, 2000)
  }

  public getWeb3() {
    this.checkActive()
    return this.web3
  }
}