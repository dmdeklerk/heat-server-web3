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
      const timestamp: number = 0
      const sourceId: string = ''
      const sourceType: SourceTypes = 0
      const confirmations: number = 0
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