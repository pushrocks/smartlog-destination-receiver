import { expect, tap } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';
import * as smartlog from '@pushrocks/smartlog';
const testQenv = new Qenv('./', './.nogit/');

import * as smartlogDestinationReceiver from '../ts/index';

let testSmartlogReceiver: smartlogDestinationReceiver.SmartlogDestinationReceiver;

tap.test('should create a valid SmartlogDestinationReceiver', async () => {
  testSmartlogReceiver = new smartlogDestinationReceiver.SmartlogDestinationReceiver({
    receiverEndpoint: process.env.RECEIVER_ENDPOINT,
    passphrase: process.env.PASSPHRASE
  });
});

tap.test('should send a valid message', async () => {
  testSmartlogReceiver.handleLog({
    timestamp: Date.now(),
    context: {
      company: 'Lossless GmbH',
      companyunit: 'Lossless Cloud',
      containerName: null,
      environment: 'local',
      runtime: 'node',
      zone: 'gitzone'
    },
    type: 'log',
    level: 'info',
    message: 'This is a message'
  });
});

tap.start();
