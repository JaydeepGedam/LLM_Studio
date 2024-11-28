import { LogLevel } from "@azure/msal-browser";
import urls from "../configure";

export const msalConfig = {
  auth: {
    clientId: urls.clientId,  
    authority: `https://login.microsoftonline.com/${urls.tenantId}/`,  
    redirectUri: "http://localhost:5173", 
  },
  cache: {
    cacheLocation: "sessionStorage", // Store auth state in sessionStorage
    storeAuthStateInCookie: false,  // Avoid storing in cookies
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
    },
  },
};
