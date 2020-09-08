import * as chai from 'chai';
const { isObject, isTrue, isNumber, isString } = chai.assert
import 'mocha';
import { createContext } from './test_config'
import { networkStatus } from '../src/modules/network_status';

describe('Network Status', () => {
  it('should work', async () => {
    let resp = await networkStatus(createContext('Status'), {})
    //console.log('response', resp)
    isObject(resp)
    let result = resp.value
    isObject(result)
    isTrue(result.lastBlockTime instanceof Date)
    isNumber(result.lastBlockHeight)
    isString(result.lastBlockId)
  });
});