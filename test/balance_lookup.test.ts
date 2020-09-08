import * as chai from 'chai';
const { isObject, isBoolean, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { balanceLookup } from '../src/modules/balance_lookup';
import { Blockchains, AssetTypes } from 'heat-server-common';

describe('Balance Lookup', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const assetType: AssetTypes = AssetTypes.NATIVE
    const assetId: string = '0'
    const addrXpub: string = '0x123456789'    
    let resp = await balanceLookup(createContext('Balance'), {
      blockchain, assetType, assetId, addrXpub
    })
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isBoolean(result.exists)
    isString(result.value)
  });
});