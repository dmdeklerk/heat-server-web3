import * as chai from 'chai';
const { isObject, isBoolean, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { resolveAlias } from '../src/modules/resolve_alias';
import { Blockchains, AssetTypes } from 'heat-server-common';

describe('Resolve Alias', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const assetType: AssetTypes = AssetTypes.NATIVE
    const alias: string = 'vitalik.eth'
    let resp = await resolveAlias(createContext('Resolve'), {
      blockchain, assetType, alias
    })
    console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isString(result.addrXpub)
    isBoolean(result.isPermanent)
  });
});