import { Stack, Duration, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import path from 'path'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as appsync from 'aws-cdk-lib/aws-appsync'
import * as api from 'aws-cdk-lib/aws-apigateway'
import * as dynamoDB from 'aws-cdk-lib/aws-dynamodb'
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

    // //API Gateway(REST)
    // const apiGateway = new api.RestApi(this,'api',{
    //   description: 'Example Rest API',
    //   deployOptions: {stageName: 'dev'},
    //   defaultCorsPreflightOptions:{
    //     allowHeaders:['Content-Type','X-Amz-Date','Authoirzation','X-Api-Key'],
    //     allowMethods:['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    //     allowCredentials: true,
    //     allowOrigins: ['http://localhost:3000']
    //   }
    // })

    // //Add Resources
    // const authorResource = apiGateway.root.addResource('author')
    
    // authorResource.addMethod('POST',new api.LambdaIntegration(authorsFun,{proxy:true,}))

    // new CfnOutput(this,'api--arn',{
    //   exportName: 'api--arn',
    //   value: apiGateway.url
    // })

    //AppSync
    const appSyncAPI = new appsync.GraphqlApi(this,'user',{
      name: 'userAPI',
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname,'../api/schema.graphql')),
      authorizationConfig:{
        defaultAuthorization:{
          authorizationType:appsync.AuthorizationType.API_KEY
        }
      }
    })

    //Lambda Function
    const usersFun = new lambda.Function(this, 'users', {
      functionName: 'users',
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      code: lambda.Code.fromAsset(path.join(__dirname,'../src/users')),
      handler: 'index.index'
    })

    //Lambda Function - Books
    const booksFun = new lambda.Function(this,'books',{
      functionName: 'books',
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      code: lambda.Code.fromAsset(path.join(__dirname,'../src/books')),
      handler:'index.index'
    })

    //Lambda Function - Books
    const cartFun = new lambda.Function(this,'cart',{
      functionName: 'cart',
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      code: lambda.Code.fromAsset(path.join(__dirname,'../src/addToCart')),
      handler:'index.index'
    })

    //Data Source
    const usersDataSource = appSyncAPI.addLambdaDataSource('user',usersFun)
    const booksDataSource = appSyncAPI.addLambdaDataSource('books',booksFun)
    const cartDataSource = appSyncAPI.addLambdaDataSource('cart',cartFun)

    //Create Resolver
    usersDataSource.createResolver('createUserResolver',{
      typeName: 'Mutation',
      fieldName: 'createUser'
      // requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname,'../api/mappingTemplates/author/createAuthor/createAuthor.req.vtl')),
      // responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname,'../api/mappingTemplates/author/createAuthor/createAuthor.res.vtl'))
    })

    usersDataSource.createResolver('getAllUserResolver',{
      typeName: 'Query',
      fieldName: 'usersList'
    })

    usersDataSource.createResolver('getUserResolver',{
      typeName: 'Query',
      fieldName: 'getUser'
    })

    usersDataSource.createResolver('deleteUserResolver',{
      typeName:'Mutation',
      fieldName:'deleteUser'
    })

    usersDataSource.createResolver('updateResolver',{
      typeName: 'Mutation',
      fieldName : 'updateUser'
    })

    booksDataSource.createResolver('createBookResolver',{
      typeName:'Mutation',
      fieldName:'createBook'
    })
    
    booksDataSource.createResolver('deleteBookResolver',{
      typeName:'Mutation',
      fieldName:'deleteBook'
    })
    
    booksDataSource.createResolver('booksListResolver',{
      typeName:'Query',
      fieldName:'booksList'
    })

    booksDataSource.createResolver('getBookResolver',{
      typeName:'Query',
      fieldName:'getBook'
    })

    cartDataSource.createResolver('addToCartResolver',{
      typeName: 'Mutation',
      fieldName: 'addCart'
    })

    cartDataSource.createResolver('deleteCartResolver',{
      typeName: 'Mutation',
      fieldName: 'deleteCart'
    })

    cartDataSource.createResolver('getCartResolver',{
      typeName: 'Query',
      fieldName: 'getCart'
    })

    cartDataSource.createResolver('cartListResolver',{
      typeName: 'Query',
      fieldName: 'cartList'
    })

    //DynamoDB
    const userTable = new dynamoDB.Table(this,'userTable',{
      tableName: 'Users',
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      partitionKey: {name:'userId', type:dynamoDB.AttributeType.STRING},
      removalPolicy: RemovalPolicy.DESTROY
    })

    const booksTable = new dynamoDB.Table(this,'booksTable',{
      tableName: 'Books',
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      partitionKey: {name:'bookId', type:dynamoDB.AttributeType.STRING},
      removalPolicy:RemovalPolicy.DESTROY
    })

    const cartTable = new dynamoDB.Table(this,'cartTable',{
      tableName: 'Cart',
      partitionKey: {name:'userId', type:dynamoDB.AttributeType.STRING},
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    })

    userTable.grantReadWriteData(usersFun)
    booksTable.grantReadWriteData(booksFun)
    cartTable.grantReadWriteData(cartFun)

    new CfnOutput(this,'graphqlurl',{
      exportName: 'graphQLurl',
      value: appSyncAPI.graphqlUrl
    })

    new CfnOutput(this, 'user--arn', {
      exportName: 'user--arn',
      value: usersFun.functionArn
    })

    new CfnOutput(this, 'books--arn',{
      exportName: 'books--arn',
      value: booksFun.functionArn
    })

    new CfnOutput(this,'cart--arn',{
      exportName: 'cart--arn',
      value: cartFun.functionArn
    })

    new CfnOutput(this,'user-table',{
      exportName:'user-table',
      value: userTable.tableArn
    })

    new CfnOutput(this, 'books-table',{
      exportName: 'books--table',
      value:booksTable.tableArn
    })

    new CfnOutput(this,'cart--table',{
      exportName: 'cart--table',
      value: cartTable.tableArn
    })
  }
}
