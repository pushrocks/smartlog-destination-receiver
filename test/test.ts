import { expect, tap } from '@pushrocks/tapbundle';
import * as smartlogDestinationReceiver from '../ts/index';

tap.test('first test', async () => {
  console.log(smartlogDestinationReceiver.standardExport);
});

tap.start();
