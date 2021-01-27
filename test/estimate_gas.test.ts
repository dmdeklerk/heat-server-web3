import * as chai from 'chai';
const { isObject, isBoolean, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { estimateGas } from '../src/modules/estimate_gas';
import { Blockchains, AssetTypes } from 'heat-server-common';
import { isNumber } from 'lodash';

const erc20TransferAbi = [{
  constant: false,
  inputs: [{
    name: "_to",
    type: "address"
  },{
    name: "_value",
    type: "uint256"
  }],
  name: "transfer",
  outputs: [{
    name: "",
    type: "bool"
  }],
  type: 'function'
}];

describe('Estimate gas', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const assetType: AssetTypes = AssetTypes.TOKEN_TYPE_1
    const contractAddress = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
    const target = '0x0F33a461848dFb9DE84cddD721ef560f3326634E'
    const from = '0x0F33a461848dFb9DE84cddD721ef560f3326634E'
    const amount = '10'
    const gasLimit = '200000'
    let resp = await estimateGas(createContext('Estimate'), {
      blockchain, assetType,
      assetId: contractAddress,
      addrXpub: target,
      value: amount,
      abi: JSON.stringify(erc20TransferAbi),
      gasLimit,
      from
    })
    console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isNumber(result.value)
  });
});