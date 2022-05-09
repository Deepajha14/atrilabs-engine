import { getToolPkgInfo, importToolConfig } from "../../shared/utils";

const toolPkgInfo = getToolPkgInfo();

importToolConfig(toolPkgInfo.configFile)
  .then((toolConfig) => {
    const fileServerConfig = toolConfig.services.fileServer;
    if (fileServerConfig) {
      // toolConfig is passed as first arg, options as second
      const eventServer = require(fileServerConfig.path)["default"];
      eventServer(toolConfig, fileServerConfig.options);
    }
  })
  .catch((err) => console.log(err));
