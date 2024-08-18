import * as openApi from "@alicloud/openapi-client";
import cdn, * as cdnApi from "@alicloud/cdn20180510";

export default class CDN {
  private client: cdn.default;

  /**
   * @see https://help.aliyun.com/zh/sdk/developer-reference/v2-nodejs-integrated-sdk
   */
  constructor({ accessKeyId, accessKeySecret }: { accessKeyId: string; accessKeySecret: string }) {
    const openApiConfig = new openApi.Config({});
    openApiConfig.accessKeyId = accessKeyId;
    openApiConfig.accessKeySecret = accessKeySecret;
    openApiConfig.endpoint = "cdn.aliyuncs.com";
    this.client = new cdn.default(openApiConfig);
  }

  /**
   * @see https://help.aliyun.com/zh/cdn/developer-reference/api-cdn-2018-05-10-batchsetcdndomainservercertificate
   * @see https://api.aliyun.com/api-tools/demo/Cdn/9afbface-b562-4c15-86e0-4bfd30a21d09
   *
   * @param cdnInfo
   * @returns
   */
  async batchSetCdnDomainServerCertificate(cdnInfo: {
    domainName: string;
    sslProtocal: string;
    certName: string;
    certType: string;
  }): Promise<cdnApi.BatchSetCdnDomainConfigResponse> {
    let request = new cdn.BatchSetCdnDomainServerCertificateRequest({});
    request.domainName = cdnInfo.domainName;
    request.SSLProtocol = cdnInfo.sslProtocal;
    request.certName = cdnInfo.certName;
    request.certType = cdnInfo.certType;
    let response = await this.client.batchSetCdnDomainServerCertificate(request);
    return response;
  }
}
