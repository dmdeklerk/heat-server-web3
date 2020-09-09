import { NetworkFeeParam, NetworkFeeResult, tryParse, CallContext, ModuleResponse } from 'heat-server-common'

export async function networkFee(context: CallContext, param: NetworkFeeParam): Promise<ModuleResponse<NetworkFeeResult>> {
  try {
    const { req, protocol, host, logger } = context
    const url = `${protocol}://${host}/api/GET-NETWORK-FEE`;
    const json = await req.get(url);
    const data = tryParse(json, logger);

    const gasPriceWei: string = '0';
    const satByte: string = '0';

    return {
      value: {
        gasPriceWei,
        satByte,
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}