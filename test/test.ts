import { expect, tap } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';
import * as smartlog from '@pushrocks/smartlog';
const testQenv = new Qenv('./', './.nogit/');

import * as smartlogDestinationReceiver from '../ts/index';

let testSmartlogReceiver: smartlogDestinationReceiver.SmartlogDestinationReceiver;

tap.test('should create a valid SmartlogDestinationReceiver', async () => {
  testSmartlogReceiver = new smartlogDestinationReceiver.SmartlogDestinationReceiver({
    receiverEndpoint: testQenv.getEnvVarOnDemand('RECEIVER_ENDPOINT'),
    passphrase: testQenv.getEnvVarOnDemand('PASSPHRASE')
  });
});

tap.test('should send a valid message', async () => {
  testSmartlogReceiver.handleLog({
    timestamp: Date.now(),
    context: {
      company: 'Lossless GmbH',
      companyunit: 'Lossless Cloud',
      containerName: 'tapbundle-test',
      environment: 'local',
      runtime: 'node',
      zone: 'gitzone'
    },
    type: 'log',
    level: 'info',
    correlation: {
      id: '123',
      type: 'none'
    },
    message: 'This is a message'
  });
});

tap.start();
