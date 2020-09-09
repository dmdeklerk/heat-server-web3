import { EventLookupParam, EventLookupResult, EventLookupEvent, tryParse, SourceTypes, CallContext } from 'heat-server-common'

export async function eventLookup(context: CallContext, param: EventLookupParam): Promise<{ error?: string, value?: Array<EventLookupResult> }> {
  try {
    const { req, protocol, host } = context
    const { blockchain, assetType, assetId, addrXpub, from, to, minimal } = param
    const url = `${protocol}://${host}/api/EVENT_LOOKUP?assetType=${assetType}&addrXpub=${addrXpub}&from=${from}&to=${to}`;
    const json = await req.get(url);
    const data = tryParse(json);

    const result: Array<EventLookupResult> = []

    // Process 'data' while populating result array
    const func = (input) => {
      const timestamp: number = undefined
      const sourceId: string = undefined
      const sourceType: SourceTypes = undefined
      const confirmations: number = undefined
      const events: Array<EventLookupEvent> = []
      return {
        timestamp, sourceId, sourceType, confirmations, events
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