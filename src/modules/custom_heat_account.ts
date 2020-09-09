import { CustomHeatAccountParam, CustomHeatAccountResult, tryParse, CallContext } from 'heat-server-common'

export async function customHeatAccount(context: CallContext, param: CustomHeatAccountParam): Promise<{ error?: string, value?: CustomHeatAccountResult }> {
  try {
    const { req, protocol, host } = context
    const { addrXpub } = param
    const url = `${protocol}://${host}/api/GET-HEAT-ACCOUNT`;
    const json = await req.get(url);
    const data = tryParse(json);
    
    const id: string = ''
    const publicKey: string = ''
    const unconfirmedBalance: string = ''
    const effectiveBalance: string = ''
    const currentLessee: string = ''
    const currentLesseeName: string = ''
    const currentLeasingHeightFrom: number = 0
    const currentLeasingHeightTo: number = 0
    const nextLessee: string = ''
    const nextLesseeName: string = ''
    const nextLeasingHeightFrom: number = 0
    const nextLeasingHeightTo: number = 0

    return {
      value: {
        id,
        publicKey,
        unconfirmedBalance,
        effectiveBalance,
        currentLessee,
        currentLesseeName,
        currentLeasingHeightFrom,
        currentLeasingHeightTo,
        nextLessee,
        nextLesseeName,
        nextLeasingHeightFrom,
        nextLeasingHeightTo
      },
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}