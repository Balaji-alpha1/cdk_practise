import { Stack, Duration, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import path from 'path'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { fileURLToPath } from 'url';

export class DemoV2Stack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //s3 bucket
    const bucket = new s3.Bucket(this,'s3bucket',{
      bucketName: 'bucketfree',
      removalPolicy: RemovalPolicy.DESTROY
    })

    //Lambda Function
    const lambdaFun = new lambda.Function(this, 'get-user', {
      functionName: 'get-user',
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      code: lambda.Code.fromAsset(path.join(__dirname,'../src')),
      handler: 'index.index'
    })

    new CfnOutput(this, 'lambda--arn', {
      exportName: 'lambdaFn--arn',
      value: lambdaFun.functionArn
    })
  }
}
