# AliCloud SSL Uploader

AliCloud SSL Uploader 主要功能是将 acme.sh、cerbot 等 acme 客户端生成的泛域名证书上传到阿里云，同时更新配置 CDN 的 ssl 配置。

使用：

1. `npm install`
2. `npm run build`
3. 在 https://ram.console.aliyun.com/users 生成好 access key id 跟 access key secret。并对 RAM 用户授权管理云盾证书服务的权限、管理CDN的权限。
4. `cp .env.example .env`，将生成的 access key id 跟 access key secret 填入 .env 文件中。
5. `cp config.yml.example config.yml`，根据实际情况，修改根目录 config.yml 文件中的内容。
6. `node dist/index.js`，根据自己所使用的 acme 客户端搭配证书更新的 hook 来执行 ssl 证书上传。例如使用 acme.sh，则可以在生成证书的时候通过 `--renew-hook` 注册要执行的 shell 脚本文件，只需要在 shell 文件中编写执行 js 脚本的逻辑即可。
