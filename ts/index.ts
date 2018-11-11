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

  handleLog(logPackageArg: ILogPackage) {
    plugins.smartrequest.postJson(this.options.receiverEndpoint, <ILogPackageAuthenticated>{
      auth: this.options.passphrase,
      logPackage: logPackageArg
    });
  }
}
