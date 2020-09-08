import { ExplorerApi, RateLimiterClass, ExplorerMiddleware, Blockchains, NetworkStatusResult, MonitoredRequest, ExplorerBase } from 'heat-server-common'
import { balanceLookup } from './modules/balance_lookup';
import { eventLookup } from './modules/event_lookup';
import { networkFee } from './modules/network_fee';
import { networkStatus } from './modules/network_status';
import { publicKeyLookup } from './modules/publickey_lookup'
import { resolveAlias } from './modules/resolve_alias'
import { reverseResolveAlias } from './modules/reverse_resolve_alias'
import { tokenDiscovery } from './modules/token_discovery'
import { transactionStatus } from './modules/transaction_status'
import { utxoLookup } from './modules/utxo_lookup'
import { ModuleProvider } from 'heat-server-common/dist/types/module_provider.interface';

/* ------------------- Configuration Start ------------------- */

// Must provide an id for this explorer
const ID = "heat"

// Must list all exposed/implemented modules 
const modules: ModuleProvider = {
  balanceLookup,
  eventLookup,
  networkFee,
  networkStatus,
  publicKeyLookup,
  resolveAlias,
  reverseResolveAlias,
  tokenDiscovery,
  transactionStatus,
  utxoLookup
}

/* ------------------- Configuration End --------------------- */

export class Explorer extends ExplorerBase {
  constructor(
    protocol: string,
    public host: string,
    public rateLimiter: RateLimiterClass,
    apiKey?: string,
    middleWare?: ExplorerMiddleware,
  ) {
    super(ID, protocol, host, modules, middleWare)
  }
}