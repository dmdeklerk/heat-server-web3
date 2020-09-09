import { UtxoLookupParam, UtxoLookupResult, tryParse, CallContext } from 'heat-server-common'

export async function utxoLookup(context: CallContext, param: UtxoLookupParam): Promise<{ error?: string, value?: Array<UtxoLookupResult> }> {
  try {
    const { req, protocol, host } = context
    const { addrXpub, assetType } = param
    const url = `${protocol}://${host}/api/UTXO-LOOKUP?assetType=${assetType}&addrXpub=${addrXpub}`;
    const json = await req.get(url);
    const data = tryParse(json);

    const result: Array<UtxoLookupResult> = []

    // Process 'data' while populating result array
    const func = (input) => {
      const value: string = ''
      const txid: string = ''
      const vout: number = 0
      const confirmations: number = 0
      const lockTime: number = 0
      const height: number = 0
      return {
        value, txid, vout, confirmations, lockTime, height
      }
    } 

    return {
      value: result,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}