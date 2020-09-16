import * as chai from 'chai';
const { isObject, isBoolean, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { reverseResolveAlias } from '../src/modules/reverse_resolve_alias';
import { Blockchains, AssetTypes } from 'heat-server-common';

describe('Reverse Resolve Alias', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const assetType: AssetTypes = AssetTypes.NATIVE
    const addrXpub: string = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
    let resp = await reverseResolveAlias(createContext('Reverse'), {
      blockchain, assetType, addrXpub
    })
    console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isString(result.alias)
    isBoolean(result.isPermanent)
  });
});