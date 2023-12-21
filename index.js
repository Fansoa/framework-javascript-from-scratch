import routes from "./routes.js";
import BrowserRouter from "./core/BrowserRouter.js";
import CacheDataService from "./src/services/cacheDataService.js";

CacheDataService.getInstance();

const root = document.getElementById("root");
BrowserRouter(routes, root);
