
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'vandenthom',
  applicationName: 'yummying-bird-serverless-api',
  appUid: 'undefined',
  orgUid: 'c6a8aa75-5d6d-4b02-bfb4-72c35761f38b',
  deploymentUid: '48010945-85f3-43e6-8c9d-6c3c4395bf63',
  serviceName: 'yummying-bird-serverless-api',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '6.2.2',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'yummying-bird-serverless-api-dev-createRecipe', timeout: 6 };

try {
  const userHandler = require('./src/lambda/recipe/createRecipe.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}