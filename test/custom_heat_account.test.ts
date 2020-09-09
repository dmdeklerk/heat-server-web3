import * as chai from 'chai';
const { isObject, isTrue, isNumber, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { customHeatAccount } from '../src/modules/custom_heat_account';
import { Blockchains, AssetTypes } from 'heat-server-common';

describe('Custom Heat Account', () => {
  it('should work', async () => {
    const blockchain = Blockchains.HEAT
    const addrXpub = '123456789'
    let resp = await customHeatAccount(createContext('Status'), {
      blockchain, addrXpub,
    })
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isString(result.id)
    isString(result.publicKey)
    isString(result.unconfirmedBalance)
    isString(result.effectiveBalance)
    isString(result.currentLessee)
    isString(result.currentLesseeName)
    isNumber(result.currentLeasingHeightFrom)
    isNumber(result.currentLeasingHeightTo)
    isString(result.nextLessee)
    isString(result.nextLesseeName)
    isNumber(result.nextLeasingHeightFrom)
    isNumber(result.nextLeasingHeightTo)
  });
});