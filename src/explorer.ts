import { RateLimiterClass, ExplorerMiddleware, ExplorerBase } from 'heat-server-common'
import { resolveAlias } from './modules/resolve_alias'
import { reverseResolveAlias } from './modules/reverse_resolve_alias'
import { estimateGas } from './modules/estimate_gas'
import { ModuleProvider } from 'heat-server-common/dist/types/module_provider.interface';

/* ------------------- Configuration Start ------------------- */

// Must provide an id for this explorer
const ID = "web3"

// Must list all exposed/implemented modules 
const modules: ModuleProvider = {
  resolveAlias,
  reverseResolveAlias,
  estimateGas,
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