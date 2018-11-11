import * as plugins from './smartlog-destination-receiver.plugins';
import {
  ILogDestination,
  ILogPackageAuthenticated,
  ILogPackage
} from '@pushrocks/smartlog-interfaces';

export interface ISmartlogDestinationReceiverConstructorOptions {
  passphrase: string;
  receiverEndpoint: string;
}

export class SmartlogDestinationReceiver implements ILogDestination {
  private options: ISmartlogDestinationReceiverConstructorOptions;

  constructor(optionsArg: ISmartlogDestinationReceiverConstructorOptions) {
    this.options = optionsArg;
  }

  public async handleLog(logPackageArg: ILogPackage) {
    const response = await plugins.smartrequest.postJson(this.options.receiverEndpoint, {
      requestBody: {
        auth: plugins.smarthash.sha256FromStringSync(this.options.passphrase),
        logPackage: logPackageArg
      }
    });
    console.log(response.body);
  }
}
