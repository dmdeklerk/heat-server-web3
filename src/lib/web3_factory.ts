const Web3 = require('web3');
const servers: Map<string, any> = new Map()

export function getWeb3(url: string) {
  if (servers.has(url)) {
    return servers.get(url)
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  servers.set(url, web3)
  return web3
}