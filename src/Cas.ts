import * as openApi from "@alicloud/openapi-client";
import cas, * as casApi from "@alicloud/cas20200407";

export default class Cas {
  private client: cas.default;

  /**
   * @see https://help.aliyun.com/zh/sdk/developer-reference/v2-nodejs-integrated-sdk
   */
  constructor({ accessKeyId, accessKeySecret }: { accessKeyId: string; accessKeySecret: string }) {
    const openApiConfig = new openApi.Config({
      accessKeyId,
      accessKeySecret,
    });
    openApiConfig.endpoint = "cas.aliyuncs.com";

    this.client = new cas.default(openApiConfig);
  }

  /**
   * @see https://api.aliyun.com/document/cas/2020-04-07/UploadUserCertificate
   * @see https://api.aliyun.com/api-tools/sdk/cas?version=2020-04-07&language=typescript-tea&tab=sdk-demo
   *
   * @param certInfo
   * @returns
   */
  async uploadUserCertificate(certInfo: {
    name: string;
    cert: string;
    key: string;
  }): Promise<casApi.UploadUserCertificateResponse> {
    let request = new casApi.UploadUserCertificateRequest({});
    request.name = certInfo.name;
    request.cert = certInfo.cert;
    request.key = certInfo.key;
    let response = await this.client.uploadUserCertificate(request);
    return response;
  }
}
