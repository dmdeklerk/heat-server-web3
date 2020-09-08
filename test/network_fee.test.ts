import * as chai from 'chai';
const { isObject, isTrue, isNumber, isString } = chai.assert
import 'mocha';
import { isUndefined } from 'lodash'
import { createContext } from './test_config'
import { networkFee } from '../src/modules/network_fee';

describe('Network Fee', () => {
  it('should work', async () => {
    let resp = await networkFee(createContext('Fee'), {})
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    if (!isUndefined(result.gasPriceWei)) isString(result.gasPriceWei)
    if (!isUndefined(result.satByte)) isString(result.satByte)
  });
});