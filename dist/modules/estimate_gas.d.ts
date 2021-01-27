import { CallContext, ModuleResponse, EstimateGasParam, EstimateGasResult } from 'heat-server-common';
export declare function estimateGas(context: CallContext, param: EstimateGasParam): Promise<ModuleResponse<EstimateGasResult>>;
