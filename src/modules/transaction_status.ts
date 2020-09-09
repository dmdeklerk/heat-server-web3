import { TransactionStatusParam, TransactionStatusResult, tryParse, CallContext } from 'heat-server-common'

export async function transactionStatus(context: CallContext, param: TransactionStatusParam): Promise<{ error?: string, value?: TransactionStatusResult }> {
  try {
    const { req, protocol, host } = context
    const { blockchain, assetType, addrXpub, transactionId } = param
    const url = `${protocol}://${host}/api/GET-TRANSACTION-STATUS`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const confirmations: number = 0;
    const isAccepted: boolean = false;
    
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