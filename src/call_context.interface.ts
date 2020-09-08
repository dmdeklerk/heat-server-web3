import { LoggerService } from "@nestjs/common";
import { MonitoredRequest } from "heat-server-common";

export interface CallContext {
  protocol: string;
  host: string;
  logger: LoggerService;
  middleWare?: ExplorerMiddleware;
  req: MonitoredRequest;
}

export interface ExplorerMiddleware {
  getAddress?(address: string);
  getNetworkFee?(
    input: string,
  ): {
    gasPriceWei?: string;
    satByte?: string;
  };
}