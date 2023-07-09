#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib'
import { DemoV2Stack } from '../lib/demo_v2-stack.js';

const app = new cdk.App();
new DemoV2Stack(app, 'DemoV2Stack', {

  // synthesizer: new cdk.DefaultStackSynthesizer({
  //   fileAssetsBucketName: 'cdk-${Qualifier}-assets-${AWS::AccountId}-${AWS::Region}',
  //   bucketPrefix: ''
  // }),

  env:{
    account:'288883441669',
    region:'ap-south-1'
  }
});
