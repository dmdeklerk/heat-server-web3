import { TransactionStatusParam, TransactionStatusResult, tryParse } from 'heat-server-common'
import { CallContext } from '../call_context.interface'

export async function transactionStatus(context: CallContext, param: TransactionStatusParam): Promise<{ error?: string, value?: TransactionStatusResult }> {
  try {
    const { req, protocol, host } = context
    const { blockchain, assetType, addrXpub, transactionId } = param
    const url = `${protocol}://${host}/api/GET-TRANSACTION-STATUS`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const confirmations = undefined;
    const isAccepted = undefined;
    
    return {
      value: {
        confirmations,
        isAccepted,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}