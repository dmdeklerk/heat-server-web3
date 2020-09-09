import * as chai from 'chai';
const { isObject, isNumber, isString, isArray } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { utxoLookup } from '../src/modules/utxo_lookup';
import { Blockchains, AssetTypes } from 'heat-server-common';

describe('Utxo Lookup', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const assetType: AssetTypes = AssetTypes.NATIVE
    const assetId: string = '0x1234'
    const addrXpub: string = '0x5678'

    let resp = await utxoLookup(createContext('Utxo'), {
      blockchain, assetType, assetId, addrXpub,
    })
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isArray(result)
    for (const utxo of result) {
      isObject(utxo)
      isString(utxo.value)
      isString(utxo.txid)
      isNumber(utxo.vout)
      isNumber(utxo.confirmations)
      isNumber(utxo.lockTime)
      isNumber(utxo.height)
    }
  });
});