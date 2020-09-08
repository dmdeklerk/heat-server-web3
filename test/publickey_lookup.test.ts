import * as chai from 'chai';
const { isObject, isBoolean, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { publicKeyLookup } from '../src/modules/publickey_lookup';
import { Blockchains } from 'heat-server-common';

describe('Publickey Lookup', () => {
  it('should work', async () => {
    const blockchain: Blockchains = Blockchains.ETHEREUM
    const addrXpub: string = '0x12345678'
    let resp = await publicKeyLookup(createContext('Publickey'), {
      blockchain, addrXpub
    })
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isString(result.publicKey)
  });
});