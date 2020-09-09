import { TransactionStatusParam, TransactionStatusResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function transactionStatus(context: CallContext, param: TransactionStatusParam): Promise<ModuleResponse<TransactionStatusResult>> {
  try {
    const { req, protocol, host, logger } = context
    const { blockchain, assetType, addrXpub, transactionId } = param
    const url = `${protocol}://${host}/api/GET-TRANSACTION-STATUS`;
    const json = await req.get(url);
    const data = tryParse(json, logger);
    
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