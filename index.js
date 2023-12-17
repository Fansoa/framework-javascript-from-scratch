import routes from "./routes.js";
import BrowserRouter from "./core/BrowserRouter.js";

const root = document.getElementById("root");
BrowserRouter(routes, root);
